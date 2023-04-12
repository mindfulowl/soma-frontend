import { Button, styled, TextField } from "@mui/material";

const StyledButton = styled(Button)`
  margin-bottom: var(--spacing-md);
`;

const Verification = () => {
  return (
    <>
      <TextField variant="outlined" label="Verification Code" fullWidth />
      <StyledButton type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
        Verify Account
      </StyledButton>
    </>
  );
};

export default Verification;
