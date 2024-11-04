export function isValidId(id: string | null | undefined): boolean {
  return !!id && id.length === 24;
}
