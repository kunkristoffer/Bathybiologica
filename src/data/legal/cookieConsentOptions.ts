import type { ConsentFormSchemaBindings } from "@/types/legal/consent.types"

export const CONSENT_FORM_SCHEMA = [
  {
    "name": "essential",
    "label": "Strictly Necessary",
    "description": "These cookies are essential for the website to function properly. They enable core functionality such as security, network management, and accessibility.",
    "tooltip": "required",
    "isRequired": true,
    "options": [
      {
        "name": "sessionCookie",
        "label": "Session Cookie",
        "description": "Maintains your session state across page requests",
        "tooltip": "session",
        "isRequired": true,
      },
      {
        "name": "locale",
        "label": "CSRF Token",
        "description": "Helps prevent cross-site request forgery attacks",
        "tooltip": "session",
        "isRequired": true,
      },
      {
        "name": "cookieConsent",
        "label": "Cookie Consent",
        "description": "Stores your cookie consent preferences",
        "tooltip": "1 year",
        "isRequired": true,
      }
    ]
  },
  {
    "name": "analyticsPerformance",
    "label": "Analytics & Performance",
    "description": "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.",
    "options": [
      {
        "name": "googleAnalyticsGA",
        "label": "Google Analytics (_ga)",
        "description": "Used to distinguish users and track page views",
        "tooltip": "2 years",
        "isRequired": true
      },
      {
        "name": "googleAnalyticsGID",
        "label": "Google Analytics (_gid)",
        "description": "Used to distinguish users for analytics",
        "tooltip": "24 hours",
        "isRequired": true
      },
      {
        "name": "vercelAnalytics",
        "label": "Vercel Analytics",
        "description": "Session",
        "tooltip": "Collects anonymous usage data to improve website performance",
        "isRequired": true
      }
    ]
  },
  {
    "name": "functional",
    "label": "Functional",
    "description": "These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.",
    "options": [
      {
        "name": "language",
        "label": "Language Preference",
        "description": "Remembers your preferred language setting",
        "tooltip": "1 year",
        "isRequired": true
      },
      {
        "name": "theme",
        "label": "Theme Preference",
        "description": "Stores your dark/light mode preference",
        "tooltip": "1 year",
        "isRequired": true
      },
      {
        "name": "timezone",
        "label": "Timezone",
        "description": "Remembers your timezone for displaying dates correctly",
        "tooltip": "1 year",
        "isRequired": true
      }
    ]
  },
  {
    "name": "socialMedia",
    "label": "Social Media",
    "description": "These cookies are set by social media services to enable you to share our content with your friends and networks.",
    "options": [
      {
        "name": "twitter",
        "label": "Twitter/X Integration",
        "description": "Enables sharing content to Twitter/X",
        "tooltip": "",
        "isRequired": true
      },
      {
        "name": "linkedin",
        "label": "LinkedIn Integration",
        "description": "Enables sharing content to LinkedIn",
        "tooltip": "",
        "isRequired": true
      }
    ]
  }
] as const satisfies ConsentFormSchemaBindings[];

export type ConsentFormSchema = typeof CONSENT_FORM_SCHEMA
