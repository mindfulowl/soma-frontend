import { useState } from "react";
import FormWrapper from "./components/FormWrapper.component";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from "amazon-cognito-identity-js";
import { Container } from "../../shared/ components/Container";
import LoadingProgress from "../../shared/ components/LoadingProgress";
import CustomSnackbar, {
  SnackBarConfig,
} from "../../shared/ components/Snackbar";
import { handleSnackbarErrorMessage } from "./utils/auth.utils";
import {
  AuthFormFieldsValues,
  UserPoolData,
  AuthEnum,
  SIGN_IN_FORM_FIELDS,
  SIGN_UP_FORM_FIELDS,
  VERIFICATION_FORM_FIELDS,
} from "./types/types.auth";

const initialFormfields = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  postCode: "",
  verificationCode: "",
};

const Authentication = () => {
  const [formFields, setFormFields] =
    useState<AuthFormFieldsValues>(initialFormfields);
  const [loading, setLoading] = useState(false);
  const [snackbarConfig, setSnackbarConfig] = useState<SnackBarConfig>();

  const location = useLocation();
  const navigate = useNavigate();

  const userPool = new CognitoUserPool(UserPoolData);

  const user = new CognitoUser({
    Username: formFields.email,
    Pool: new CognitoUserPool(UserPoolData),
  });

  let authType: AuthEnum = location.pathname.includes("sign-in")
    ? AuthEnum.SIGN_IN
    : location.pathname.includes("sign-up")
    ? AuthEnum.SIGN_UP
    : AuthEnum.VERIFICATION;

  const handleSnackBarClose = () => {
    setSnackbarConfig({ ...snackbarConfig, open: false });
  };

  const handleFormFieldChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmitSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await userPool.signUp(
      formFields.email,
      formFields.password,
      [],
      [],
      (error, data) => {
        if (error) {
          console.log(error);
          setSnackbarConfig({
            message: handleSnackbarErrorMessage(error.message),
            open: true,
            type: "error",
          });
          setLoading(false);
          return;
        }

        navigate("/verification");
        // axios.post formFields to DB here + remove log
        console.log(data);
        setLoading(false);
        return;
      }
    );
  };

  const handleSubmitVerification = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formFields.verificationCode) return;
    setLoading(true);
    user.confirmRegistration(
      formFields.verificationCode,
      true,
      (error, data) => {
        if (error) {
          setSnackbarConfig({
            message: handleSnackbarErrorMessage(error.message),
            open: true,
            type: "error",
          });
          setLoading(false);
          return;
        }
        if (data) {
          setSnackbarConfig({
            message: "Account successfully verified!",
            open: true,
            type: "success",
          });
          setLoading(false);
          navigate("/sign-in");
          return;
        }
      }
    );
  };

  const handleSubmitSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const authDetails = new AuthenticationDetails({
      Username: formFields.email,
      Password: formFields.password,
    });

    user.authenticateUser(authDetails, {
      onFailure(error) {
        setSnackbarConfig({
          message: handleSnackbarErrorMessage(error.message),
          open: true,
          type: "error",
        });
      },
      onSuccess(data) {
        console.log(data);
        navigate("/welcome");
      },
    });
    setLoading(false);
  };

  const handleResendVerificationCode = () => {
    setLoading(true);
    user.resendConfirmationCode((error, data) => {
      if (error) {
        setSnackbarConfig({
          message: error.message,
          open: true,
          type: "error",
        });
      }
      if (data) {
        setSnackbarConfig({
          message: "Verification code has been resent to your email!",
          open: true,
          type: "info",
        });
      }
    });
    setLoading(false);
  };

  if (loading) {
    return <LoadingProgress />;
  }

  return (
    <Container>
      {authType === AuthEnum.SIGN_IN ? (
        <FormWrapper
          handleFormFieldChange={handleFormFieldChange}
          formFields={SIGN_IN_FORM_FIELDS}
          handleSubmit={handleSubmitSignIn}
          title="Sign In"
          authType={AuthEnum.SIGN_IN}
          defaultValues={formFields}
          buttonText="Sign In"
        />
      ) : authType === AuthEnum.SIGN_UP ? (
        <FormWrapper
          handleFormFieldChange={handleFormFieldChange}
          formFields={SIGN_UP_FORM_FIELDS}
          handleSubmit={handleSubmitSignUp}
          title="Sign Up"
          authType={AuthEnum.SIGN_UP}
          defaultValues={formFields}
          buttonText="Sign Up"
        />
      ) : (
        <FormWrapper
          handleFormFieldChange={handleFormFieldChange}
          handleResendVerificationCode={handleResendVerificationCode}
          formFields={VERIFICATION_FORM_FIELDS}
          handleSubmit={handleSubmitVerification}
          title="Verification"
          authType={AuthEnum.VERIFICATION}
          buttonText="Verify"
        />
      )}

      <CustomSnackbar config={snackbarConfig} setOpen={handleSnackBarClose} />
    </Container>
  );
};

export default Authentication;
