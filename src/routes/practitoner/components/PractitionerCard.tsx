import { Chip, IconButton } from "@mui/material";
import styled from "styled-components";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { H3, H4, P } from "../../../shared/styles";
import {
  CardWrapper,
  InnerCardWrapper,
} from "../../../shared/styles/cardStyles/CardStyles";

export type Practitioner = {
  name: string;
  profile: string;
  discipline: string;
  distance: string;
  healthConcerns: Array<string>;
};

type PractitionerCardProps = {
  practitionerData: Practitioner;
};

const StyledHeader = styled(H3)`
  margin-top: var(--spacing-sm);
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LocationWrapper = styled.div`
  margin-top: var(--spacing-sm);
  align-items: center;
  display: flex;
`;

const ChipWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
  width: 35%;
`;

const StyledImageContainer = styled.img`
  border: 3px solid var(--color-grey);
  border-radius: 100px;
  width: 30%;
  height: 100%;
`;

const StyledText = styled(H4)`
  color: var(--color-gold-font);
  margin-bottom: var(--spacing-sm);
`;

const StyledIconBackdrop = styled.span`
  background-color: var(--color-grey);
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;

const StyledPersonIcon = styled(PersonIcon)`
  font-size: 35px;
  margin-top: var(--spacing-xs);
`;

const StyledPhoneIcon = styled(LocalPhoneIcon)`
  font-size: 35px;
  margin-top: var(--spacing-xs);
`;

const StyledLocationIcon = styled(LocationOnIcon)`
  font-size: 35px;
`;

const PractitionerCard = (props: PractitionerCardProps) => {
  const { practitionerData } = props;
  return (
    <CardWrapper>
      <StyledImageContainer
        src={require("../../../assets/images/healthNewsImage.jpeg")}
      />

      <InnerCardWrapper>
        <HeaderWrapper>
          <StyledHeader>{practitionerData.name}</StyledHeader>
          <div>
            <IconButton color="primary" size="large">
              <StyledIconBackdrop>
                <StyledPhoneIcon />
              </StyledIconBackdrop>
            </IconButton>
            <IconButton color="primary" size="large">
              <StyledIconBackdrop>
                <StyledPersonIcon />
              </StyledIconBackdrop>
            </IconButton>
          </div>
        </HeaderWrapper>

        <StyledText bold>{practitionerData.discipline}</StyledText>
        <ChipWrapper>
          {practitionerData.healthConcerns.map((healthConcern) => {
            return <Chip label={healthConcern} />;
          })}
        </ChipWrapper>

        <P>{practitionerData.profile}</P>
        <LocationWrapper>
          <StyledLocationIcon />
          <P>{practitionerData.distance}</P>
        </LocationWrapper>
      </InnerCardWrapper>
    </CardWrapper>
  );
};

export default PractitionerCard;