'use client';

import { ComponentProps, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const MAX_HEADER_LEVEL = 3;

interface ContentLink {
  id: string;
  label: string;
  children?: ContentLink[];
}

interface TableOfContentsProps extends ComponentProps<'aside'> {
  links: ContentLink[];
}

function nestHeadings(elements: HTMLHeadingElement[]): ContentLink[] {
  const result: ContentLink[] = [];
  const stack: { level: number; link: ContentLink }[] = [];

  for (const element of elements) {
    const level = Number(element.nodeName.charAt(1));
    const link = { id: element.id, label: element.innerText } satisfies ContentLink;

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

function LinkSection({ id, label, children }: ContentLink) {
  return (
    <>
      <a href={`#${id}`} className='pl-2 border-l border-transparent hover:border-text'>
        {label}
      </a>
      {children?.length && (
        <div className='flex flex-col pl-2'>
          {children.map((child) => (
            <LinkSection key={child.id} {...child} />
          ))}
        </div>
      )}
    </>
  );
}

export function TableOfContents({ links, className, ...props }: TableOfContentsProps) {
  return (
    <aside className={twMerge('w-full max-w-64', className)} {...props}>
      <div className='sticky top-(--header-h) max-h-[calc(100svh-var(--header-h))] p-2 mr-2 overflow-y-auto'>
        <p>Table of contens</p>
        <nav className='flex flex-col'>
          {links.map((link) => (
            <LinkSection key={link.id} {...link} />
          ))}
        </nav>
      </div>
    </aside>
  );
}

export function TableOfContentsDynamic({ links, className, ...props }: TableOfContentsProps) {
  const [queryLinks, setQueryLinks] = useState<ContentLink[]>(links);

  useEffect(() => {
    async function getLinks() {
      const variants = Array.from(Array(MAX_HEADER_LEVEL), (_, i) => `h${i + 1}`).join(', ');
      const elements = Array.from(document.querySelectorAll<HTMLHeadingElement>(variants)).filter(
        (element) => element.id
      );
      setQueryLinks(nestHeadings(elements));
    }
    getLinks();
  }, []);

  return <TableOfContents links={queryLinks} {...props} />;
}

// todo
// Highligh current section in viewport
// Make list collapsable
