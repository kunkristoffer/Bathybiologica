import { type ConsentForm } from "@/data/legal/consent/formBinds"

/** Avaliable consent tags */
type ConsentTagsID = "external" | "recommended"

/** Basic structure of a consent form binding */
interface ConsentOption {
  name: string,
  isRequired?: boolean
  tags?: ConsentTagsID[]
}

/** The final structure of a consent form used in generating form bindings */
export interface ConsentCategory extends ConsentOption {
  options: ConsentOption[]
}

// Extract values and structs from the constructed consent form
export type ConsentFormCategories = ConsentForm[number]["name"]
export type ConsentFormOptions = ConsentForm[number]["options"][number]["name"]
export type ConsentOptions = Record<ConsentFormOptions, boolean>


// Consent cookie struct
export type ConsentMode = "all" | "essential" | "none" | "custom"

type ConsentCookieBase = {
  version: number
  updatedAt: number
}

type ConsentCookieCustom = ConsentCookieBase & {
  mode: Extract<ConsentMode, "custom">
  categories: ConsentFormOptions
}
type ConsentCookieNonCustom = ConsentCookieBase & {
  mode: Exclude<ConsentMode, "custom">
  categories?: never
}

export type ConsentCookie = ConsentCookieCustom | ConsentCookieNonCustom
