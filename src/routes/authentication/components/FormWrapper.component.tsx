import { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Container,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SignUpFormFields from "./AuthFormFields";
import Verification from "./Verification.component";

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

type FormWrapperProps = {
  handleFormFieldChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  authType: string;
};

const StyledBox = styled(Box)`
  margin-top: var(--spacing-xs);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledAvatarWrapper = styled(Avatar)`
  background-color: var(--color-deep-purple);
  margin-bottom: var(--spacing-sm);
`;

const StyledLink = styled(Link)`
  color: var(--color-black);
`;

const StyledButton = styled(Button)`
  margin-bottom: var(--spacing-md);
`;

const FormWrapper = (props: FormWrapperProps) => {
  const { handleFormFieldChange, authType } = props;
  const [showVerification, setShowVerification] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (authType === "sign-up") {
      setShowVerification(true);
    }
  };

  useEffect(() => {
    if (authType === "sign-in") {
      setShowVerification(false);
    }
  }, [authType]);

  return (
    <Container component="main" maxWidth="xs">
      <StyledBox>
        <StyledAvatarWrapper>
          <LockOutlinedIcon />
        </StyledAvatarWrapper>
        <Typography component="h1" variant="h5">
          {authType === "sign-up" ? "Sign Up" : "Sign In"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          {!showVerification && (
            <>
              <SignUpFormFields
                handleFormFieldChange={handleFormFieldChange}
                formFields={
                  authType === "sign-up"
                    ? SIGN_UP_FORM_FIELDS
                    : SIGN_IN_FORM_FIELDS
                }
              />
              <StyledButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
              >
                {authType === "sign-up" ? "Sign Up" : "Sign In"}
              </StyledButton>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <StyledLink
                    to={authType === "sign-up" ? "/sign-in" : "/sign-up"}
                  >
                    {authType === "sign-up"
                      ? "Already have an account? Sign In"
                      : "Don't have an account yet? Sign Up"}
                  </StyledLink>
                </Grid>
              </Grid>
            </>
          )}
          {showVerification && <Verification />}
        </Box>
      </StyledBox>
    </Container>
  );
};

export default FormWrapper;
