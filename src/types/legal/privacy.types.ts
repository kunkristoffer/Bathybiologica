type PrivacyParagraph = {
  type: "paragraph",
  text: string
}
type PrivacyReason = {
  type: "reason"
  what: string
  why: string
  how: string
}

type PrivacyBlock = PrivacyParagraph | PrivacyReason

export interface PrivacySectionNode {
  id: string;
  title: string;
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
