import styled from "styled-components";
import { Container } from "../../../shared/components/Container";
import { StyledLink } from "../../../shared/components/Link";
import { H3, H4, P } from "../../../shared/styles";

export type NavCardData = {
  title: string;
  subtitle: string;
  text: string;
  navLink: string;
};

type NavCardProps = {
  navCardData: NavCardData;
};

const StyledContainer = styled(Container)`
  background-color: var(--color-white);
  padding: var(--spacing-lg);
  margin: var(--spacing-md);
  border-radius: var(--border-radius);
  text-align: center;
`;

const StyledTitle = styled(H3)`
  color: var(--color-gold-font);
  margin-bottom: var(--spacing-md);
`;

const StyledSubtitle = styled(H4)`
  margin-bottom: var(--spacing-md);
`;

const StyledText = styled(P)`
  margin-bottom: var(--spacing-lg);
`;

const NavCard = (props: NavCardProps) => {
  const { title, subtitle, text, navLink } = props.navCardData;
  return (
    <StyledContainer>
      <StyledTitle>{title.toUpperCase()}</StyledTitle>
      <StyledSubtitle>{subtitle}</StyledSubtitle>
      <StyledText>{text}</StyledText>
      <StyledLink to={navLink} marginTop>
        {title}
      </StyledLink>
    </StyledContainer>
  );
};

export default NavCard;
