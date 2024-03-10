export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export function sliceLongString(string: string, maxLength: number, replaceWith = "..."): string {
  if (!string) {
    return "";
  }

  if (string.length < maxLength) {
    return string;
  }

  return string.slice(0, maxLength) + replaceWith;
}

export function matchString(substring: string, string: string): boolean {
  if (string.toLowerCase().includes(substring.toLowerCase())) {
    return true;
  }
  return false;
}

export function pluralize(singularForm: string, pluralForm: string, count: number): string {
  if (count === 0 || count > 1) {
    return pluralForm;
  }

  return singularForm;
}
