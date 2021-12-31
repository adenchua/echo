export const loginErrorCodeToMessageHelper = (errorCode: string): string => {
  if (errorCode === "404" || errorCode === "401") {
    return "Invalid username/password";
  }

  return "Sorry, we couldn't log you in. Please try again later";
};
