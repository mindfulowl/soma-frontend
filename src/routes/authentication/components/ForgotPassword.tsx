import styled from "styled-components";
import { useState } from "react";
import { Container, Box, TextField } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { H2 } from "../../../shared/styles";
import {
  StyledFormContainer,
  StyledAvatarWrapper,
  StyledFormButton,
} from "../../../shared/styles/formStyles/FormStyles";
import { CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js";
import { UserPoolData } from "../types/types.auth";
import CustomSnackbar, {
  SnackBarConfig,
} from "../../../shared/components/Snackbar";
import { showErrorSnackbar } from "../utils/auth.utils";
import { useNavigate } from "react-router-dom";

const StyledTextField = styled(TextField)`
  margin-bottom: var(--spacing-md);
`;

const ForgotPassword = () => {
  const [snackbarConfig, setSnackbarConfig] = useState<SnackBarConfig>();
  const [userEmail, setUserEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const navigate = useNavigate();

  const handleSnackBarClose = () => {
    setSnackbarConfig({ ...snackbarConfig, open: false });
  };

  const user = new CognitoUser({
    Username: userEmail,
    Pool: new CognitoUserPool(UserPoolData),
  });

  const handleEmailSubmit = () => {
    user.forgotPassword({
      onSuccess: () => {
        setEmailSent(true);
      },
      onFailure: (error) => {
        setSnackbarConfig(showErrorSnackbar(error.message));
      },
    });
  };

  const confirmPasswordChange = () => {
    return new Promise(() => {
      user.confirmPassword(verificationCode, newPassword, {
        onFailure(error) {
          setSnackbarConfig(showErrorSnackbar(error.message));
        },
        onSuccess() {
          navigate("/");
        },
      });
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <StyledFormContainer>
        <StyledAvatarWrapper>
          <LockOutlinedIcon />
        </StyledAvatarWrapper>
        <H2>Reset Password</H2>
        <Box sx={{ mt: 3 }}>
          {!emailSent ? (
            <StyledTextField
              fullWidth
              variant="outlined"
              label="Email Address"
              onChange={(e) => setUserEmail(e.target.value)}
            />
          ) : (
            <>
              <StyledTextField
                fullWidth
                variant="outlined"
                label="Verification Code"
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <StyledTextField
                fullWidth
                variant="outlined"
                label="New Password"
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
              />
            </>
          )}
          {!emailSent ? (
            <StyledFormButton
              type="button"
              fullWidth
              variant="outlined"
              onClick={handleEmailSubmit}
              disabled={!userEmail}
            >
              Send Verification Email
            </StyledFormButton>
          ) : (
            <StyledFormButton
              type="button"
              fullWidth
              variant="outlined"
              onClick={confirmPasswordChange}
              disabled={!verificationCode || !newPassword}
            >
              Reset Password
            </StyledFormButton>
          )}
        </Box>
      </StyledFormContainer>
      <CustomSnackbar config={snackbarConfig} setOpen={handleSnackBarClose} />
    </Container>
  );
};

export default ForgotPassword;
