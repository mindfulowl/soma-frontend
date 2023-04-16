import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

type VerificationProps = {
  email: string;
};

const StyledAvatarWrapper = styled(Avatar)`
  background-color: var(--color-deep-purple);
  margin-bottom: var(--spacing-sm);
`;

const StyledBox = styled(Box)`
  margin-top: var(--spacing-md);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Verification = (props: VerificationProps) => {
  const { email } = props;
  const [verificationCode, setVerificationCode] = useState<string>();

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setVerificationCode(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <>
      <Container component="main" maxWidth="xs">
        <StyledBox>
          <StyledAvatarWrapper>
            <LockOutlinedIcon />
          </StyledAvatarWrapper>
          <Typography component="h1" variant="h5">
            Verify Account
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField variant="outlined" label="Verification Code" fullWidth />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
              Verify Account
            </Button>
            <Button type="button" fullWidth variant="outlined" sx={{ mt: 2 }}>
              Resend Code
            </Button>
          </Box>
        </StyledBox>
      </Container>
    </>
  );
};

export default Verification;
