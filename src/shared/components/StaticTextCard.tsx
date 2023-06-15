import styled from "styled-components";
import { H4, P, screenMdMin } from "../styles";
import { CardWrapper, InnerCardWrapper } from "../styles/cardStyles/CardStyles";

type StaticTextCardProps = {
  title: string;
  text: string;
};

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

const StaticTextCard = (props: StaticTextCardProps) => {
  const { title, text } = props;
  return (
    <CardWrapper>
      <InnerCardWrapper>
        <StyledHeader>{title}</StyledHeader>
        <StyledTextWrapper>
          <StyledText>{text}</StyledText>
        </StyledTextWrapper>
      </InnerCardWrapper>
    </CardWrapper>
  );
};

export default StaticTextCard;
