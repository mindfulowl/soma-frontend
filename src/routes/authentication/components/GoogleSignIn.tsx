import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import { Auth } from "aws-amplify";
import { showErrorSnackbar } from "../utils/auth.utils";
import GoogleButton from "react-google-button";
import styled from "styled-components";
import { Box } from "@mui/material";

const GoogleSignInContainer = styled(Box)`
    padding: var(--spacing-md);
`

const GoogleSignIn = () => {
    const handleGoogleSignIn = async () => {
        try {
          await Auth.federatedSignIn({
            provider: CognitoHostedUIIdentityProvider.Google,
          });
        } catch (error) {
          console.log(error);
          showErrorSnackbar(error.message);
        }
      };

    return (
        <GoogleSignInContainer>
            <GoogleButton onClick={handleGoogleSignIn} />
        </GoogleSignInContainer>
    );
};

export default GoogleSignIn;
