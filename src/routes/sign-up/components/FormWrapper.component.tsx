import {
  Box,
  Avatar,
  Container,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import * as React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import styled from "styled-components";
import UserFormFields from "./UserFormFields.component";

type FormWrapperProps = {
  handleFormFieldChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
};

const StyledBox = styled(Box)`
  margin-top: var(--spacing-xs);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledAvatarWrapper = styled(Avatar)`
  background-color: var(--color-deep-purple);
`;

const StyledLink = styled(Link)`
  color: var(--color-black);
`;

const FormWrapper = (props: FormWrapperProps) => {
  const { handleFormFieldChange } = props;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(event);
  };

  return (
    <Container component="main" maxWidth="xs">
      <StyledBox>
        <StyledAvatarWrapper>
          <LockOutlinedIcon />
        </StyledAvatarWrapper>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <UserFormFields handleFormFieldChange={handleFormFieldChange} />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <StyledLink to="/sign-in">
                Already have an account? Sign in
              </StyledLink>
            </Grid>
          </Grid>
        </Box>
      </StyledBox>
    </Container>
  );
};

export default FormWrapper;
