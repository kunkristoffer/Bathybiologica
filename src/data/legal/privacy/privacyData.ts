type Paragraph = { text: string }
type Reason = {
  what: string
  why: string
  how: string
}

export interface PrivacyData {
  id: string
  content: (Paragraph | Reason)[]
  children?: PrivacyData
}

export const privacyData = [
  {
    "id": "privacy-page",
    content: [
      { text: "testst" }
    ]
  }
] satisfies PrivacyData[]
