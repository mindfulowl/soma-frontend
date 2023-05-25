import styled from "styled-components";
import { StyledLink } from "../../../shared/components/Link";
import { H4, screenMdMin, P } from "../../../shared/styles";
import {
  CardWrapper,
  InnerCardWrapper,
} from "../../../shared/styles/cardStyles/CardStyles";

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

const NotAMemberCard = () => {
  return (
    <CardWrapper>
      <InnerCardWrapper>
        <StyledHeader>It seems you are not a member!</StyledHeader>
        <StyledTextWrapper>
          <StyledText>
            Please head to our
            <StyledLink to="membership"> Membership Page</StyledLink> to gain
            access to this feature.
          </StyledText>
        </StyledTextWrapper>
      </InnerCardWrapper>
    </CardWrapper>
  );
};

export default NotAMemberCard;
