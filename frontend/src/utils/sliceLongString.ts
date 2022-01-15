export function sliceLongString(string: string, maxLength: number, replaceWith = "..."): string {
  if (!string) {
    return "";
  }

  if (string.length < maxLength) {
    return string;
  }

  return string.slice(0, maxLength) + replaceWith;
}
