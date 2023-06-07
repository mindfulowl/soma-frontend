import { Box, Container, Grid } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthFormFields from "./AuthFormFields";
import {
  StyledAvatarWrapper,
  StyledFormContainer,
  StyledFormButton,
} from "../../../shared/styles/formStyles/FormStyles";
import { H2 } from "../../../shared/styles";
import { FormField, AuthEnum, FormFieldsValues } from "../types/types.auth";

type FormWrapperProps = {
  handleFormFieldChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  formFields: Array<FormField>;
  authType: AuthEnum;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  buttonText: string;
  defaultValues?: FormFieldsValues;
  handleResendVerificationCode?: () => void;
  userNotConfirmed?: boolean;
};

const StyledLink = styled(Link)`
  color: var(--color-black);
  margin-bottom: var(--spacing-sm);
`;

const LinkWrapper = styled.div`
  flex-direction: column;
  display: flex;
  text-align: right;
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
    userNotConfirmed,
  } = props;

  const navigate = useNavigate();
  return (
    <Container component="main" maxWidth="xs">
      <StyledFormContainer>
        <StyledAvatarWrapper>
          <LockOutlinedIcon />
        </StyledAvatarWrapper>
        <H2>{title}</H2>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <AuthFormFields
            handleFormFieldChange={handleFormFieldChange}
            formFields={formFields}
            defaultValues={defaultValues}
          />
          <StyledFormButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
          >
            {buttonText}
          </StyledFormButton>
          {authType === AuthEnum.VERIFICATION ||
            (userNotConfirmed && (
              <StyledFormButton
                type="button"
                fullWidth
                variant="outlined"
                onClick={() => {
                  handleResendVerificationCode &&
                    handleResendVerificationCode();
                  navigate("/verification");
                }}
              >
                Resend code to Email
              </StyledFormButton>
            ))}
          <Grid container justifyContent="flex-end">
            <Grid item>
              {authType === AuthEnum.SIGN_UP ? (
                <>
                  <StyledLink to="/sign-in">
                    Already have an account? Sign In
                  </StyledLink>
                </>
              ) : authType === AuthEnum.SIGN_IN ? (
                <LinkWrapper>
                  <StyledLink to="/sign-up">
                    Don't have an account yet? Sign Up
                  </StyledLink>
                  <StyledLink to="/forgot-password">
                    Forgot Password?
                  </StyledLink>
                </LinkWrapper>
              ) : (
                <></>
              )}
            </Grid>
          </Grid>
        </Box>
      </StyledFormContainer>
    </Container>
  );
};

export default FormWrapper;
