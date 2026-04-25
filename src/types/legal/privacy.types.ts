interface PrivacyMeta {
  type: "meta"
  text: string
}

interface PrivacyParagraph {
  type: "paragraph",
  text: string
}

interface PrivacyReason {
  type: "reason"
  what: string
  why: string
  how: string
}

type PrivacyBlock = PrivacyParagraph | PrivacyReason | PrivacyMeta

export interface PrivacySectionNode {
  id: string;
  title: string;
  index?: number[]
  level?: 1 | 2 | 3 | 4 | 5 | 6 | (number & {})
  content: PrivacyBlock[];
  children?: PrivacySectionNode[];
}

export interface PrivacyMessages {
  static: {
    what: string;
    why: string;
    how: string;
  };
  sections: PrivacySectionNode[];
}

export type CountResult = {
  sections: number
  paragraphs: number
  reasons: number
  meta: number
  totalBlocks: number
}
