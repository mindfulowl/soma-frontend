import { useContext, useState } from "react";
import FormWrapper from "./components/AuthFormWrapper.component";
import axios from "axios";
import { Auth } from "aws-amplify";
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
import { UserContext } from "../../shared/contexts/UserContext";

const initialFormfields = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  postCode: "",
  verificationCode: "",
};

const userPool = new CognitoUserPool(UserPoolData);

const Authentication = () => {
  const [formFields, setFormFields] =
    useState<AuthFormFieldsValues>(initialFormfields);
  const [loading, setLoading] = useState(false);
  const [snackbarConfig, setSnackbarConfig] = useState<SnackBarConfig>();
  const [userNotConfirmed, setUserNotConfirmed] = useState(false);

  const { setCurrentUser } = useContext(UserContext);

  const location = useLocation();
  const navigate = useNavigate();

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

  const createUser = async (cogId: string, token: string) => {
    const userInput = {
      firstName: formFields.firstName,
      lastName: formFields.lastName,
      email: formFields.email,
      postcode: formFields.postCode,
      cognitoId: cogId,
    };
    try {
      await axios.post(
        "http://ec2-13-40-183-104.eu-west-2.compute.amazonaws.com/users",
        userInput,
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (error) {
      setSnackbarConfig({
        message: handleSnackbarErrorMessage("default"),
        open: true,
        type: "error",
      });
    }
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
          setSnackbarConfig({
            message: handleSnackbarErrorMessage(error.message),
            open: true,
            type: "error",
          });
          setLoading(false);
          return;
        }
        navigate("/verification");
        setLoading(false);
        return;
      }
    );
  };

  const handleSubmitSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const authDetails = new AuthenticationDetails({
      Username: formFields.email,
      Password: formFields.password,
    });

    await user.authenticateUser(authDetails, {
      onFailure(error) {
        if (error.message && error.message.includes("not confirmed")) {
          setUserNotConfirmed(true);
        }
        setSnackbarConfig({
          message: handleSnackbarErrorMessage(error.message),
          open: true,
          type: "error",
        });
      },
      onSuccess(data: any) {
        setCurrentUser({
          email: formFields.email,
          token: data.idToken.jwtToken,
        });
        navigate("/welcome");
      },
    });
  };

  const handleSubmitVerification = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const authDetails = new AuthenticationDetails({
      Username: formFields.email,
      Password: formFields.password,
    });

    if (!formFields.verificationCode) return;

    setLoading(true);

    await user.confirmRegistration(
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
          user.authenticateUser(authDetails, {
            onFailure(error) {
              setSnackbarConfig({
                message: handleSnackbarErrorMessage(error.message),
                open: true,
                type: "error",
              });
            },
            onSuccess() {
              Auth.currentAuthenticatedUser().then((res) => {
                createUser(
                  res.attributes.sub,
                  res.signInUserSession.idToken.jwtToken
                );
              });
            },
          });
        }

        setLoading(false);
        navigate("/welcome");
        return;
      }
    );
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
        <>
          <FormWrapper
            handleFormFieldChange={handleFormFieldChange}
            formFields={SIGN_IN_FORM_FIELDS}
            handleSubmit={handleSubmitSignIn}
            title="Sign In"
            authType={AuthEnum.SIGN_IN}
            defaultValues={formFields}
            buttonText="Sign In"
            userNotConfirmed={userNotConfirmed}
            handleResendVerificationCode={handleResendVerificationCode}
          />
        </>
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
