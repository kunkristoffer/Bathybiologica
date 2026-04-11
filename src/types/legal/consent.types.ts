import { ConsentFormSchema } from "@/data/legal/cookieConsentOptions"

/** Basic structure of a consent form binding */
export type ConsentFormBindings = {
  name: string
  label: string
  description: string
  tooltip?: string
  isRequired?: boolean
}

/** The final structure of a consent form used in generating form bindings */
export type ConsentFormSchemaBindings = ConsentFormBindings & { options?: ConsentFormBindings[] }

// Extract values and structs from the constructed consent form
export type ConsentFormCategoryNames = ConsentFormSchema[number]["name"]
export type ConsentFormOptionsNames = NonNullable<ConsentFormSchema[number]["options"]>[number]["name"]

// Consent cookie struct
type ConsentMode = "all" | "essential" | "custom"
type ConsentCookieBase = {
  version: number
  updatedAt: number
}
type ConsentCookieCustom = ConsentCookieBase & {
  mode: Extract<ConsentMode, "custom">
  categories: Record<ConsentFormCategoryNames, boolean>
}
type ConsentCookieNonCustom = ConsentCookieBase & {
  mode: Exclude<ConsentMode, "custom">
}
export type ConsentCookie = ConsentCookieCustom | ConsentCookieNonCustom
