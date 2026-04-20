'use client';

import { type ComponentProps, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ToCItem, ToCSection } from './ToCSection';
import { ArrowDownFromLine, ArrowUpFromLine } from 'lucide-react';

export interface TableOfContentProps {
  /** optional title
   * @default "Table of Content"
   */
  title?: string;
  /** id attribute of the container you want to query for headdings, defaults to document */
  containerID?: string;
  /** limit which headings the component should query for */
  headingLevels?: ('h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6')[];
  /** class overrides, used for Tailwind classes */
  className?: ComponentProps<'nav'>['className'];
}

export function TableOfContents({ title, containerID, headingLevels, className }: TableOfContentProps) {
  const [headings, setHeadings] = useState<ToCItem[]>([]);
  const [activeID, setActiveID] = useState('');
  const [expandedIDs, setExpandedIDs] = useState<Set<string>>(new Set());
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  // Use intersection observer to keep track of which headings are in focus
  const observerRef = useRef<IntersectionObserver | null>(null);
  const headingElementsRef = useRef<Map<string, IntersectionObserverEntry>>(new Map());

  // Handles user interactions when clicking on a link item
  function handleClick(id: string) {
    setExpandedIDs((oldSet) => {
      const newSet = new Set(oldSet);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }

  // Handles automatic expanding / collapsing of link sections in ToC
  useEffect(() => {
    const collapseOther: boolean = true;
    if (headings.length && activeID) {
      const parentIDs = getParentIDs(headings, activeID);
      console.log(activeID);

      if (!parentIDs.length) return;

      if (collapseOther) {
        setExpandedIDs(() => {
          const newSet = new Set(activeID);
          parentIDs.forEach((id) => newSet.add(id));
          return newSet;
        });
      } else {
        setExpandedIDs((prev) => {
          const newSet = new Set(prev);
          parentIDs.forEach((id) => newSet.add(id));
          return newSet;
        });
      }
    }
  }, [activeID]);

  // Scan page or contaier for headings
  useEffect(() => {
    const queryElement = containerID ? document?.getElementById(containerID) : document;
    const queryResult = Array.from(
      queryElement?.querySelectorAll<HTMLHeadingElement>(
        headingLevels ? headingLevels.join(', ') : 'h1, h2, h3, h4, h5, h6'
      ) ?? []
    ).filter((heading) => heading.id);

    if (queryResult.length) {
      setHeadings(nestHeadings(queryResult));
    }
  }, []);

  // Attach interaction observer to headings
  useEffect(() => {
    // Define root element used in lookup and quit early if possible. Stops possible ssr issues
    const container = containerID ? document.querySelector(containerID) : document.body;
    if (!container || headings.length === 0) return;

    // Get all IDs used inside container
    const allIDs = getAllIDs(headings);

    const callback: IntersectionObserverCallback = (entries) => {
      // Add all observer entries to our ref so we can itterate over elements for conditional checks
      entries.forEach((entry) => {
        headingElementsRef.current.set(entry.target.id, entry);
      });

      // Get the top headings that are visible
      const visibleHeadingsIDs: string[] = [];
      headingElementsRef.current.forEach((entry, id) => {
        if (entry.isIntersecting) {
          visibleHeadingsIDs.push(id);
        }
      });

      if (visibleHeadingsIDs.length) {
        // Get the one with the smallest top position
        let topMost = visibleHeadingsIDs[0];
        let topMostPos = Infinity;

        visibleHeadingsIDs.forEach((id) => {
          const element = document.getElementById(id);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top >= 0 && rect.top < topMostPos) {
              topMostPos = rect.top;
              topMost = id;
            }
          }
        });

        setActiveID(topMost);
      } else {
        // No headings visible, find the closest one above viewport
        let closestAbove: string | null = null;
        let closestAbovePos = -Infinity;

        allIDs.forEach((id) => {
          const element = document.getElementById(id);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top < 0 && rect.top > closestAbovePos) {
              closestAbovePos = rect.top;
              closestAbove = id;
            }
          }
        });

        if (closestAbove) {
          setActiveID(closestAbove);
        }
      }
    };

    // Instanciate observer and observe all header elements inside specified container
    observerRef.current = new IntersectionObserver(callback, {
      rootMargin: `-12px 0px -40% 0px`,
      threshold: [0, 1],
    });
    allIDs.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => {
      observerRef.current?.disconnect();
      headingElementsRef.current.clear();
    };
  }, [headings]);

  return (
    <aside className='min-w-48'>
      <nav
        className={twMerge(
          `z-10 fixed sm:sticky top-[calc(var(--header-h)+1rem)] max-h-[calc(100svh-var(--header-h)-2rem)]
          flex flex-col gap-4 panel bg-surface max-sm:inset-4 max-sm:top-auto`,
          className
        )}
      >
        <span className='flex justify-between gap-2 items-center' onClick={() => setIsCollapsed((old) => !old)}>
          <h2 className='text-center'>{title || 'Table of Content'}</h2>
          <span className='sm:hidden'>{!isCollapsed ? <ArrowDownFromLine /> : <ArrowUpFromLine />}</span>
        </span>
        <div className={`flex flex-col overflow-y-auto text-sm ${isCollapsed ? 'max-sm:hidden' : ''}`}>
          {headings.map((category) => (
            <ToCSection
              key={category.id}
              item={category}
              activeID={activeID}
              expandedIDs={expandedIDs}
              onClick={handleClick}
            />
          ))}
        </div>
      </nav>
    </aside>
  );
}

export function getAllIDs(items: ToCItem[]): string[] {
  const ids: string[] = [];
  for (const item of items) {
    ids.push(item.id);
    if (item.children) {
      ids.push(...getAllIDs(item.children));
    }
  }
  return ids;
}

export function getParentIDs(items: ToCItem[], targetID: string, parents: string[] = []): string[] {
  for (const item of items) {
    if (item.id === targetID) {
      return parents;
    }
    if (item.children && item.children.length > 0) {
      const found = getParentIDs(item.children, targetID, [...parents, item.id]);
      if (found.length > 0) {
        return found;
      }
    }
  }
  return [];
}

/** Responsible for taking an array of headings and parsing it into a nested array that we can consume */
export function nestHeadings(elements: HTMLHeadingElement[]): ToCItem[] {
  const result: ToCItem[] = [];
  const stack: { level: number; link: ToCItem }[] = [];

  for (const element of elements) {
    const level = Number(element.nodeName.charAt(1));
    const link = { id: element.id, label: element.innerText, level } satisfies ToCItem;

    // Reset stack when this element is a sibling or if heading level decreases
    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop();
    }

    if (stack.length === 0) {
      result.push(link);
    } else {
      const parent = stack[stack.length - 1].link;
      parent.children ??= [];
      parent.children.push(link);
    }

    stack.push({ level, link });
  }

  return result;
}
