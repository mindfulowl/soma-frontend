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
import AuthFormFields from "./AuthFormFields";
import { FormField, AuthEnum, AuthFormFieldsValues } from "../types/types.auth";

type FormWrapperProps = {
  handleFormFieldChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  formFields: Array<FormField>;
  authType: AuthEnum;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  buttonText: string;
  defaultValues?: AuthFormFieldsValues;
  handleResendVerificationCode?: () => void;
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
  const {
    handleFormFieldChange,
    authType,
    formFields,
    handleSubmit,
    title,
    buttonText,
    defaultValues,
    handleResendVerificationCode,
  } = props;

  return (
    <Container component="main" maxWidth="xs">
      <StyledBox>
        <StyledAvatarWrapper>
          <LockOutlinedIcon />
        </StyledAvatarWrapper>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <AuthFormFields
            handleFormFieldChange={handleFormFieldChange}
            formFields={formFields}
            defaultValues={defaultValues}
          />
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
          >
            {buttonText}
          </StyledButton>
          {authType === AuthEnum.VERIFICATION && (
            <StyledButton
              type="button"
              fullWidth
              variant="outlined"
              onClick={() =>
                handleResendVerificationCode && handleResendVerificationCode()
              }
            >
              Resend code to Email
            </StyledButton>
          )}
          <Grid container justifyContent="flex-end">
            <Grid item>
              {authType === AuthEnum.SIGN_UP ? (
                <StyledLink to="/sign-in">
                  Already have an account? Sign In
                </StyledLink>
              ) : authType === AuthEnum.SIGN_IN ? (
                <StyledLink to="/sign-up">
                  Don't have an account yet? Sign Up
                </StyledLink>
              ) : (
                <></>
              )}
            </Grid>
          </Grid>
        </Box>
      </StyledBox>
    </Container>
  );
};

export default FormWrapper;
