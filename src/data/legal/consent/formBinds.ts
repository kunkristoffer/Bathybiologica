import { ConsentCategory } from "@/types/legal/consent.types"

export const consentFormData = [
  {
    // Required for site to work propperly
    name: 'essential',
    isRequired: true,
    options: [
      { name: "cookieConsent", isRequired: true, },
      { name: "sessionCookie", isRequired: true, }
    ]
  }, {
    // Used for site functionality, such as form submission, but is technically optional
    name: 'functional',
    options: [
      { name: "recaptcha", tags: ["external", "recommended"] },
      { name: "locale" },
      { name: "theme" },
    ]
  }, {
    // Analyze how a user uses our site, only used for improving the site performance
    name: 'analytics',
    options: [
      { name: "googleAnalytics", tags: ["external"] }
    ]
  }, {
    // Allow social media integrations
    name: 'social',
    options: [
      { name: "metaSocial", tags: ["external"] }
    ]
  }, {
    // Allow 3rd parties to collect metrics to improve SEO
    name: 'campaigns',
    options: [
      { name: "googleCampaigns", tags: ["external"] },
      { name: "youtube", tags: ["external"] },
      { name: "metaCampaigns", tags: ["external"] }
    ]
  }
] as const satisfies ConsentCategory[]

export type ConsentForm = typeof consentFormData
