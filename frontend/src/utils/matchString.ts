export function matchString(substring: string, string: string): boolean {
  if (string.toLowerCase().includes(substring.toLowerCase())) {
    return true;
  }
  return false;
}
