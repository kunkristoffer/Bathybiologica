type Tooltip = "required" | (string & {})

interface CookieOption {
  name: string
  label: string
  description?: string
  tooltip?: Tooltip
}

interface CookieCategory {
  name: string
  label: string
  description?: string
  tooltip?: Tooltip
  options: CookieOption[]
}
