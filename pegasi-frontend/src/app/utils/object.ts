export function removeInvalidProps(obj: Record<string, unknown>) {
  Object.keys(obj).forEach(
    (key) =>
      (obj[key] === undefined || obj[key] === null || obj[key] === '') &&
      delete obj[key]
  )
  return obj
}
