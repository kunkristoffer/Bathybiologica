import { ConsentCategory } from "@/types/legal/consent.types"

export const consentFormData = [
  {
    name: 'essential',
    isRequired: true,
    options: [
      { name: "cookieConsent", cookieName: "consent", isRequired: true, },
    ]
  }, {
    name: 'functional',
    tags: ["essential"],
    options: [
      { name: "reCAPTCHA", cookieName: "_grecaptcha", tags: ["external"] },
      { name: "locale", cookieName: "locale", },
      { name: "theme", cookieName: "theme", },
    ]
  }
] as const satisfies ConsentCategory[]

export type ConsentForm = typeof consentFormData
