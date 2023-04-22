import { SnackBarConfig } from "../../../shared/ components/Snackbar";

export const handleSnackbarErrorMessage = (message: string) => {
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
  if (message.includes("User is not confirmed.")) {
    return "Account has not been verified.";
  }
  if (message.includes("Incorrect username or password.")) {
    return message;
  }
  return "An error occured, please try again later.";
};

export const showErrorSnackbar = (message: string): SnackBarConfig => {
  return {
    open: true,
    type: "error",
    message: handleSnackbarErrorMessage(message),
  };
};
