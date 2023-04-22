import { Link } from "react-router-dom";
import styled from "styled-components";

type StyledLinkProps = {
  marginTop?: boolean;
};

export const StyledLink = styled(Link)<StyledLinkProps>`
  padding: 0 var(--spacing-sm);
  text-decoration: none;
  color: var(--color-gold-font);
  margin-top: ${({ marginTop }) => marginTop && `auto`};
`;