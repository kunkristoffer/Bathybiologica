'use client';

import { type ComponentProps, useCallback, useEffect, useRef, useState } from 'react';
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
  // Component visibilty
  const [isVisible, setIsVisible] = useState(true);

  // Heading states
  const [headings, setHeadings] = useState<ToCItem[]>([]);
  const [activeID, setActiveID] = useState('');
  const [expandedIDs, setExpandedIDs] = useState<Set<string>>(new Set());
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  // Use intersection observer to keep track of which headings are in focus
  const observerRef = useRef<IntersectionObserver | null>(null);
  const headingElementsRef = useRef<Map<string, IntersectionObserverEntry>>(new Map());

  // Handle expansion and collapse of link sections
  const toggleSection = useCallback(
    (id: string) => {
      // Does the currently active element have a parent?
      const parentIDs = getParentIDs(headings, id);

      setExpandedIDs(() => {
        const newSet = new Set([id]);
        parentIDs.forEach((parentId) => newSet.add(parentId));
        return newSet;
      });
    },
    [headings]
  );

  useEffect(() => {
    // Define root query container
    const queryContainer = containerID ? document?.getElementById(containerID) : document;
    if (!queryContainer) return;

    // Get all headings inside query container, and filter out values without a matching ID ref
    const querySelector = headingLevels ? headingLevels.join(', ') : 'h1, h2, h3, h4, h5, h6';
    const headingElements = Array.from(queryContainer.querySelectorAll<HTMLHeadingElement>(querySelector)).filter(
      (heading) => heading.id
    );
    if (!headingElements.length) return;

    // Update state with headings result
    const nestedHeadings = nestHeadings(headingElements);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHeadings(nestedHeadings);

    // Create a single array with all heading element IDs, used for lookup and itteration
    const allIDs = getAllIDs(nestedHeadings);
    // Add root query container if supplied
    if (containerID) {
      allIDs.push(containerID);
    }

    const callback: IntersectionObserverCallback = (entries) => {
      // Add all observer entries to our ref so we can itterate over elements for conditional checks
      entries.forEach((entry) => {
        headingElementsRef.current.set(entry.target.id, entry);
      });

      // Check if query container is inside view, toggles component state
      if (containerID && headingElementsRef.current.has(containerID)) {
        const containerObserver = headingElementsRef.current.get(containerID)!;
        const { top, height } = containerObserver.target.getBoundingClientRect();
        const diff = (height - Math.abs(top)) / window.innerHeight;
        setIsVisible(diff > 1);
      }

      // Get the top headings that are visible
      const visibleHeadingsIDs: string[] = [];
      headingElementsRef.current.forEach((entry, id) => {
        if (entry.isIntersecting && entry.target.id !== containerID) {
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

        // Handle automatic section toggling
        const parentIDs = getParentIDs(nestedHeadings, topMost);
        setExpandedIDs(() => {
          const newSet = new Set([topMost]);
          parentIDs.forEach((parentId) => newSet.add(parentId));
          return newSet;
        });

        // Mark setion as active
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
      rootMargin: `-80px 0px -40% 0px`,
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
    };
  }, [containerID, headingLevels]);

  return (
    <aside
      className={` ${isVisible ? 'opacity-100' : 'max-sm:opacity-0 max-sm:pointer-events-none'} transition duration-100`}
    >
      <nav
        className={twMerge(
          `z-10 fixed sm:sticky top-[calc(var(--header-h)+1rem)] max-h-[calc(100svh-var(--header-h)-2rem)]
          flex flex-col gap-4 panel bg-surface max-sm:inset-2 max-sm:top-auto p-2`,
          className
        )}
      >
        <span className='flex justify-between gap-2 items-center' onClick={() => setIsCollapsed((old) => !old)}>
          <h2 className='text-center'>{title || 'Table of Content'}</h2>
          <span className='sm:hidden'>{!isCollapsed ? <ArrowDownFromLine /> : <ArrowUpFromLine />}</span>
        </span>
        <ul className={`flex flex-col pr-2 overflow-y-auto text-sm ${isCollapsed ? 'max-sm:hidden' : ''}`}>
          {headings.map((category) => (
            <ToCSection
              key={category.id}
              item={category}
              activeID={activeID}
              expandedIDs={expandedIDs}
              onClick={toggleSection}
            />
          ))}
        </ul>
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
