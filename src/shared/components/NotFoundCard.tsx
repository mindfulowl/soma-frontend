import styled from "styled-components";
import { H4, P, screenMdMin } from "../styles";
import { CardWrapper, InnerCardWrapper } from "../styles/cardStyles/CardStyles";

const StyledHeader = styled(H4)`
  margin-bottom: var(--spacing-md);
  text-decoration: underline;
  @media ${screenMdMin} {
    font-size: 18px;
  }
`;
const StyledTextWrapper = styled.div`
  margin-bottom: var(--spacing-sm);
  display: flex;
  font-size: var(--font-size-small);
`;

const StyledText = styled(P)`
  font-size: var(--font-size-mobile);
  @media ${screenMdMin} {
    font-size: var(--font-size-p);
  }
`;

const NotFoundCard = () => {
  return (
    <CardWrapper>
      <InnerCardWrapper>
        <StyledHeader>No Product Found</StyledHeader>
        <StyledTextWrapper>
          <StyledText>
            Please use our filters to find your required products
          </StyledText>
        </StyledTextWrapper>
      </InnerCardWrapper>
    </CardWrapper>
  );
};

export default NotFoundCard;
