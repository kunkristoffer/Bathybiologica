'use client';

import { ChevronDown } from 'lucide-react';
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
  // How can i collapse this section, then expand when: user clicks on category or if user scrolls target into view?
  return (
    <div className='group pl-2 border-l-2 border-transparent hover:border-panel-border'>
      <a href={`#${id}`} className='flex justify-between items-center gap-2 hover:underline'>
        <p>{label}</p>
        {children?.length && <ChevronDown className='group-hover:rotate-x-180 duration-200' />}
      </a>
      {children?.length && (
        <div className='flex flex-col'>
          {children.map((child) => (
            <LinkSection key={child.id} {...child} />
          ))}
        </div>
      )}
    </div>
  );
}

export function TableOfContents({ links, className, ...props }: TableOfContentsProps) {
  return (
    <aside className={twMerge('w-full max-w-64', className)} {...props}>
      <div className='sticky top-(--header-h) max-h-[calc(100svh-var(--header-h))] p-2 mr-2 overflow-y-auto'>
        <h2>Table of contens</h2>
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
// Should i perhaps send a ref to document so that only headings inside is included?
// For intersection observer: initiate it in the TableOfContentsDynamic and send currently active to TableOfContents, gotta add
