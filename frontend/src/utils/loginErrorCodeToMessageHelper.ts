export const loginErrorCodeToMessageHelper = (errorCode: string): string => {
  if (errorCode === "404" || errorCode === "401") {
    return "Invalid username/password combination";
  }

  return "Something went wrong. Please try again later";
};
