export enum AuthEnum {
  SIGN_IN = "sign-in",
  SIGN_UP = "sign-up",
  VERIFICATION = "verification",
  COMPLETE_REGISTRATION = "complete-registration",
}

export type AuthFormFieldsValues = {
  email: string;
  password: string;
  postCode: string;
  firstName: string;
  lastName: string;
  verificationCode?: string;
};

export type CompleteRegistrationFormFieldsValues = {
  firstName: string;
  lastName: string;
  postCode: string;
};

export type FormFieldsValues =
  | AuthFormFieldsValues
  | CompleteRegistrationFormFieldsValues;

export type FormField = {
  name: string;
  label: string;
  type: string;
  sm?: number;
  xs?: number;
};

export type User = {
  id?: string;
  email: string;
  postcode?: string;
  firstName?: string;
  lastName?: string;
  idToken?: string;
  hasCompletedRegistration?: boolean;
  isMember?: boolean;
};

export type IdTokenData = {
  email: string;
  "cognito:username": string;
};

export const UserPoolData = {
  UserPoolId: "eu-west-2_siv7j3Ap4" as string,
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID as string,
};

export const SIGN_UP_FORM_FIELDS: Array<FormField> = [
  { name: "firstName", label: "First Name", type: "text", sm: 6, xs: 12 },
  { name: "lastName", label: "Last Name", type: "text", sm: 6, xs: 12 },
  { name: "email", label: "Email", type: "email", xs: 12 },
  { name: "postCode", label: "Post Code", type: "text", xs: 12 },
  { name: "password", label: "Password", type: "password", xs: 12 },
];

export const VERIFICATION_FORM_FIELDS: Array<FormField> = [
  {
    name: "verificationCode",
    label: "Verification Code",
    type: "text",
    xs: 12,
  },
];

export const SIGN_IN_FORM_FIELDS: Array<FormField> = [
  { name: "email", label: "Email", type: "email", xs: 12 },
  { name: "password", label: "Password", type: "password", xs: 12 },
];

export const COMPLETE_REGISTRATION_FORM_FIELDS: Array<FormField> = [
  { name: "firstName", label: "First Name", type: "text", sm: 6, xs: 12 },
  { name: "lastName", label: "Last Name", type: "text", sm: 6, xs: 12 },
  { name: "postCode", label: "Post Code", type: "text", xs: 12 },
];
