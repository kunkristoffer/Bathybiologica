import { type ConsentForm } from "@/data/legal/consent/formBinds"

/** Avaliable consent tags */
type ConsentTagsID = "essential" | "recommended" | "measurement" | "external"

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
export type ConsentCategories = Record<ConsentFormCategories, Partial<ConsentOptions>>
export type ConsentOptions = Record<ConsentFormOptions, boolean>


// Consent cookie struct
export type ConsentCookie = {
  version: number
  updatedAt: number
  options: Partial<ConsentOptions>
}

export type ConsentMode = "all" | "none" | "custom" | "essential"
