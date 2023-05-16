import { Chip } from "@mui/material";
import styled from "styled-components";
import { H4, P } from "../../../shared/styles";
import {
  CardWrapper,
  InnerCardWrapper,
} from "../../../shared/styles/cardStyles/CardStyles";

export type Practitioner = {
  name: string;
  profile: string;
  discipline: string;
  healthConcerns: Array<string>;
};

type PractitionerCardProps = {
  practitionerData: Practitioner;
};

const StyledHeader = styled(H4)`
  margin-bottom: var(--spacing-md);
`;

const ChipWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
  width: 35%;
`;

const StyledImageContainer = styled.img`
  border-radius: 100px;
  width: 30%;
  height: 100%;
`;

const PractitionerCard = (props: PractitionerCardProps) => {
  const { practitionerData } = props;
  return (
    <CardWrapper>
      <StyledImageContainer
        src={require("../../../assets/images/healthNewsImage.jpeg")}
      />
      <InnerCardWrapper>
        <StyledHeader>{practitionerData.name}</StyledHeader>
        <ChipWrapper>
          {practitionerData.healthConcerns.map((healthConcern) => {
            return <Chip label={healthConcern} />;
          })}
        </ChipWrapper>

        <P>{practitionerData.profile}</P>
      </InnerCardWrapper>
    </CardWrapper>
  );
};

export default PractitionerCard;
