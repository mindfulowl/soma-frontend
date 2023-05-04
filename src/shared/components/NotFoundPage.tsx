import { Container, Box, Button } from "@mui/material";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { H3 } from "../styles";

const StyledBox = styled(Box)`
  margin-top: var(--spacing-xs);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledIcon = styled(TroubleshootIcon)`
  margin: var(--spacing-lg) 0;
  font-size: 50px;
`;

const StyledButton = styled(Button)`
  margin: var(--spacing-lg) 0;
`;

const ImageContainer = styled.img`
  max-height: 40vh;
  width: 100%;
`;

const NotFoundPage = () => {
  const navigate = useNavigate();

  const navToHome = () => navigate("/welcome");

  return (
    <Container component="main" maxWidth="xs">
      <StyledBox>
        <StyledIcon />

        <H3>
          We couldn't find the page you were looking for. Navigate to home by
          using the below button!
        </H3>

        <StyledButton
          type="button"
          fullWidth
          variant="contained"
          onClick={navToHome}
        >
          Go To Home
        </StyledButton>
      </StyledBox>
      <ImageContainer src={require("../../assets/images/logo.png")} />
    </Container>
  );
};

export default NotFoundPage;
