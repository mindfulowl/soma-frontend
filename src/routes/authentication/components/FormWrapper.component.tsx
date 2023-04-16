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
import { AuthEnum, FormField } from "../Authentication.component";

type FormWrapperProps = {
  handleFormFieldChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  formFields: Array<FormField>;
  authType: AuthEnum;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title: string;
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
  const { handleFormFieldChange, authType, formFields, handleSubmit, title } =
    props;

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
          />
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
          >
            {title}
          </StyledButton>

          <Grid container justifyContent="flex-end">
            <Grid item>
              {authType === AuthEnum.SIGN_UP ? (
                <StyledLink to="/sign-in">
                  Already have an account? Sign In
                </StyledLink>
              ) : (
                <StyledLink to="/sign-up">
                  Don't have an account yet? Sign Up
                </StyledLink>
              )}
            </Grid>
          </Grid>
        </Box>
      </StyledBox>
    </Container>
  );
};

export default FormWrapper;
