export const handleSnackbarErrorMessage = (message: string): string => {
  if (message.includes("Password not long enough")) {
    return "Your password must be 8 characters or more.";
  }
  if (message.includes("Password must have uppercase characters")) {
    return "Your password must contain an uppercase character.";
  }
  if (message.includes("An account with the given email already exists")) {
    return "An account with this email address already exists.";
  }
  if (message.includes("Invalid verification code provided")) {
    return "Incorrect code submitted, please try again.";
  }
  return "An error occured, please try again later.";
};
