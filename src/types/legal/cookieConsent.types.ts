type Tooltip = "required" | (string & {})

export interface CookieOption {
  name: string
  label: string
  isEnabled?: boolean
  description?: string
  tooltip?: Tooltip
}

export interface CookieCategory {
  name: string
  label: string
  description?: string
  tooltip?: Tooltip
  options: CookieOption[]
}

export type SelectedCookies = Record<keyof CookieOption, boolean>
