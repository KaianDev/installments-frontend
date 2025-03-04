export const normalizeValue = (value: string) => {
  return value.replace(/\./g, "").replace(",", ".")
}
