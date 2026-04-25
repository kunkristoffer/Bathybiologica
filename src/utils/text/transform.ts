/** Convert a `snake_case` or `kebab-case` to `camelCase` */
export function toCamelCase(text: string) {
  return text.toLowerCase().replace(/[-_][a-z0-9]/g, (group) => group.slice(-1).toUpperCase());
}
