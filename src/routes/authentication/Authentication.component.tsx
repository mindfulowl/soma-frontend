import { useState } from "react";
import FormWrapper from "./components/FormWrapper.component";
import { useLocation, useNavigate } from "react-router-dom";
import { Container } from "../../shared/ components/Container";

export enum AuthEnum {
  SIGN_IN = "sign-in",
  SIGN_UP = "sign-up",
}

export type FormField = {
  name: string;
  label: string;
  type: string;
  sm?: number;
  xs?: number;
};

const SIGN_UP_FORM_FIELDS = [
  { name: "firstName", label: "First Name", type: "text", sm: 6, xs: 12 },
  { name: "lastName", label: "Last Name", type: "text", sm: 6, xs: 12 },
  { name: "email", label: "Email", type: "email", xs: 12 },
  { name: "postCode", label: "Post Code", type: "text", xs: 12 },
  { name: "password", label: "Password", type: "password", xs: 12 },
];

const SIGN_IN_FORM_FIELDS = [
  { name: "email", label: "Email", type: "email", xs: 12 },
  { name: "password", label: "Password", type: "password", xs: 12 },
];

const Authentication = () => {
  const [formFields, setFormFields] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  let authType: AuthEnum = location.pathname.includes("sign-in")
    ? AuthEnum.SIGN_IN
    : AuthEnum.SIGN_UP;

  const handleFormFieldChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmitSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/verification");
  };

  const handleSubmitSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formFields);
  };

  return (
    <Container>
      {authType === AuthEnum.SIGN_IN ? (
        <FormWrapper
          handleFormFieldChange={handleFormFieldChange}
          formFields={SIGN_IN_FORM_FIELDS}
          handleSubmit={(e) => handleSubmitSignIn(e)}
          title="Sign In"
          authType={AuthEnum.SIGN_IN}
        />
      ) : (
        <FormWrapper
          handleFormFieldChange={handleFormFieldChange}
          formFields={SIGN_UP_FORM_FIELDS}
          handleSubmit={handleSubmitSignUp}
          title="Sign Up"
          authType={AuthEnum.SIGN_UP}
        />
      )}
    </Container>
  );
};

export default Authentication;
