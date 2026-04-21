import Link from 'next/link';

/** This reffers to a single heading (h1,h2...) converted so it can be proccessed in its component */
export interface ToCItem {
  /** id attribute of the element */
  id: string;
  /** innerText content from the element */
  label: string;
  /** heading variant converted to a nummeric representation, e.g: h1 => 1 */
  level: number;
  /** used if a higher level heading has lower level variants, indicating nested headings in content */
  children?: ToCItem[];
}

/** This is the expanded implementation of `ToCItem` that also inclueds required UI props */
export interface ToCSectionProps {
  item: ToCItem;
  /** Currently active element is highligted and comes from users clicking on a header or scrolling it into view */
  activeID: string;
  /** To highlight active header, we need to keep track of its parents and expand their collapsable UI */
  expandedIDs: Set<string>;
  /** Trying to make this obsolete with intersection observer, will leave for now */
  onClick: (id: string) => void;
}

export function ToCSection({ item, activeID, expandedIDs, onClick }: ToCSectionProps) {
  const isActive = item.id === activeID;
  const isExpanded = expandedIDs.has(item.id);

  return (
    <li
      className={`pl-2 py-0.5 border-l-2 ${isExpanded ? (isActive ? 'border-primary' : 'border-tertiary') : 'border-panel-border/10'}`}
    >
      <Link
        href={`#${item.id}`}
        className={`${isActive ? 'text-primary font-bold ' : ''} hover:underline`}
        onClick={() => onClick(item.id)}
      >
        {item.label}
      </Link>
      {isExpanded && item.children && (
        <ul className='py-2'>
          {item.children.map((child) => (
            <ToCSection key={child.id} item={child} activeID={activeID} expandedIDs={expandedIDs} onClick={onClick} />
          ))}
        </ul>
      )}
    </li>
  );
}
