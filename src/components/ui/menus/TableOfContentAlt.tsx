'use client';

import Link from 'next/link';
import { ComponentProps, useEffect, useRef, useState } from 'react';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeaderItem {
  id: string;
  label: string;
  level: number;
  children?: HeaderItem[];
}

interface TableOfContentProps {
  /** optional title
   * @default "Table of Content"
   */
  title?: string;
  /** id attribute of the container you want to query for headdings, defaults to document */
  containerID?: string;
  /** limit which headings the component should query for */
  headingLevels?: HeadingLevel[];
  /** class overrides, used mostly for Tailwind */
  classNames?: {
    aside: ComponentProps<'aside'>['className'];
  };
}

function getAllIds(items: HeaderItem[]): string[] {
  const ids: string[] = [];
  for (const item of items) {
    ids.push(item.id);
    if (item.children) {
      ids.push(...getAllIds(item.children));
    }
  }
  return ids;
}

export function TableOfContent({ title, containerID, headingLevels }: TableOfContentProps) {
  const [headings, setHeadings] = useState<HeaderItem[]>([]);
  const [activeID, setActiveID] = useState('');
  const [expandedID, setExpandedID] = useState<string[]>([]);

  // Use intersection observer to keep track of which headings are in focus
  const observerRef = useRef<IntersectionObserver | null>(null);
  const headingElementsRef = useRef<Map<string, IntersectionObserverEntry>>(new Map());

  function handleClick(e: string) {
    setActiveID(e);
    setExpandedID((old) => (old.includes(e) ? old.filter((item) => item !== e) : [e]));
  }

  useEffect(() => {
    const queryElement = containerID ? document?.getElementById(containerID) : document;
    const queryResult = Array.from(
      queryElement?.querySelectorAll<HTMLHeadingElement>(
        headingLevels ? headingLevels.join(', ') : 'h1,h2,h3,h4,h5,h6'
      ) ?? []
    ).filter((heading) => heading.id);
    /* .map<HeaderItem>((heading) => ({
        id: heading.id,
        label: heading.innerText,
        level: Number(heading.nodeName.charAt(1)),
      })) */ if (queryResult.length) {
      setHeadings(nestHeadings(queryResult));
      setActiveID(queryResult[0].id);
      setExpandedID([queryResult[0].id]);
    }
  }, []);

  // Attach interaction observer to headings
  useEffect(() => {
    const container = containerID ? document?.getElementById(containerID) : document;
    if (!container || headings.length === 0) return;

    const allIds = getAllIds(headings);

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        headingElementsRef.current.set(entry.target.id, entry);
      });

      // Get the topmost visible heading
      const visibleHeadings: string[] = [];
      headingElementsRef.current.forEach((entry, id) => {
        if (entry.isIntersecting) {
          visibleHeadings.push(id);
        }
      });
      if (visibleHeadings.length > 0) {
        // Get the one with the smallest top position
        let topMost = visibleHeadings[0];
        let topMostPos = Infinity;

        visibleHeadings.forEach((id) => {
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

        allIds.forEach((id) => {
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
          console.log(closestAbove);
        }
      }
    };

    observerRef.current = new IntersectionObserver(observerCallback, {
      rootMargin: `-${'140'}px 0px -40% 0px`,
      threshold: [0, 1],
    });

    allIds.forEach((id) => {
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
    <aside className=''>
      <nav
        className='
          sticky top-(--header-h) max-h-[calc(100svh-var(--header-h))]
          flex flex-col p-2 gap-4
        '
      >
        <h2>{title || 'Table of Content'}</h2>
        <div className='flex flex-col overflow-y-auto'>
          {headings.map((category) => (
            <TableCategory
              key={category.id}
              item={category}
              level={1}
              activeID={activeID}
              expandedID={expandedID}
              onClick={handleClick}
            />
          ))}
        </div>
      </nav>
    </aside>
  );
}

interface TableItemProps {
  item: HeaderItem;
  activeID: string;
  expandedID: string[];
  onClick: (id: string) => void;
  level: number;
}

function TableCategory({ item, level, activeID, expandedID, onClick }: TableItemProps) {
  const isActive = item.id === activeID;
  const isExpanded = expandedID.includes(item.id);

  return (
    <li className='pl-2'>
      <Link
        href={`#${item.id}`}
        className={`${isActive ? 'text-primary' : ''} hover:underline`}
        onClick={() => onClick(item.id)}
      >
        {item.label}
      </Link>
      {isActive && (
        <ul className='pl-2'>
          {item.children?.map((child) => (
            <TableCategory
              key={child.id}
              item={child}
              activeID={activeID}
              expandedID={expandedID}
              level={level + 1}
              onClick={onClick}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

function nestHeadings(elements: HTMLHeadingElement[]): HeaderItem[] {
  const result: HeaderItem[] = [];
  const stack: { level: number; link: HeaderItem }[] = [];

  for (const element of elements) {
    const level = Number(element.nodeName.charAt(1));
    const link = { id: element.id, label: element.innerText, level } satisfies HeaderItem;

    // Reset stack when this element is a sibling or going back up
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
