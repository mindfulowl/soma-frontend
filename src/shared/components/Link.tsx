import { Link } from "react-router-dom";
import styled from "styled-components";
import { screenMdMin } from "../styles";

type StyledLinkProps = {
  marginTop?: boolean;
  marginRight?: boolean;
};

export const StyledLink = styled(Link)<StyledLinkProps>`
  padding: ${({ marginRight }) => marginRight && `0 var(--spacing-xs)`};
  text-decoration: none;
  font-weight: 550;
  color: var(--color-gold-font);
  margin-top: ${({ marginTop }) => marginTop && `auto`};
  font-size: var(--font-size-mobile);
  @media ${screenMdMin} {
    font-size: var(--font-size-p);
  }
`;
