import { Chip } from "@mui/material";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const StyledChip = styled(Chip)`
  margin-left: var(--spacing-lg);
  cursor: pointer;
`;

const Footer = () => {
  const navToPrivacy = () =>
    window.open("https://www.somavitalitywellness.com/privacy-policy/");

  const navToTerms = () =>
    window.open("https://www.somavitalitywellness.com/terms-and-conditions/");
  return (
    <Wrapper>
      <StyledChip label="Privacy Policy" onClick={navToPrivacy} />{" "}
      <StyledChip label="Contact Us at contact@somavitalitywellness.com" />
      <StyledChip label="Terms and Conditions" onClick={navToTerms} />
    </Wrapper>
  );
};
export default Footer;
