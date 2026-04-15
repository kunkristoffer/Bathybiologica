import { ConsentCategory } from "@/types/legal/consent.types"

export const consentFormData = [
  {
    name: 'essential',
    isRequired: true,
    options: [
      { name: "cookieConsent", isRequired: true, },
    ]
  }, {
    name: 'functional',
    tags: ["essential"],
    options: [
      { name: "reCAPTCHA", tags: ["external"] },
      { name: "locale" },
      { name: "theme" },
    ]
  }
] as const satisfies ConsentCategory[]

export type ConsentForm = typeof consentFormData
