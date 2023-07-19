import { SyntheticEvent } from "react";
import { Chip, IconButton, Tooltip } from "@mui/material";
import styled from "styled-components";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LanguageIcon from "@mui/icons-material/Language";
import { H3, H5, P, screenMdMin } from "../../../shared/styles";
import { Practitioner } from "../types/practitioner.types";

type PractitionerCardProps = {
  practitionerData: Practitioner;
};
const StyledSubtitle = styled(H5)`
  font-size: var(--font-size-small);
  @media ${screenMdMin} {
    font-size: var(--font-size-mobile);
    max-width: 75px;
    margin-top: var(--spacing-xs);
  }
`;
const CardWrapper = styled.div`
  background-color: var(--color-white);
  border-radius: var(--border-radius);
  margin-bottom: var(--spacing-md);
  padding: var(--spacing-md);
  @media ${screenMdMin} {
    display: flex;
    align-items: center;
  }
`;

const StyledHeader = styled(H3)`
  margin-top: var(--spacing-sm);
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  @media ${screenMdMin} {
    flex-direction: row;
    margin-bottom: var(--spacing-md);
  }
`;

const InnerCardWrapper = styled.div`
  @media ${screenMdMin} {
    margin-left: var(--spacing-md);
  }
`;

const LocationWrapper = styled.div`
  margin-top: var(--spacing-sm);
  align-items: center;
  display: flex;
`;

const ChipWrapper = styled.div`
  display: flex;
  margin-bottom: var(--spacing-md);
  max-width: 80%;
`;

const StyledChip = styled(Chip)`
  margin-left: var(--spacing-xs);
`;

const StyledImageContainer = styled.img`
  border: 3px solid var(--color-grey);
  border-radius: 100px;
  width: 100%;
  height: 30%;
  @media ${screenMdMin} {
    border-radius: 100px;
    width: 30%;
    height: 70%;
  }
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

const StyledUrlIcon = styled(LanguageIcon)`
  font-size: 35px;
  margin-top: var(--spacing-xs);
`;

const Wrapper = styled.div`
  display: flex;
  margin-bottom: var(--spacing-md);
`;

const PractitionerCard = (props: PractitionerCardProps) => {
  const { practitionerData } = props;

  const defaultImage = (ev: SyntheticEvent<HTMLImageElement, Event>) => {
    return ((
      ev.target as HTMLImageElement
    ).src = require("../../../assets/images/healthNewsImage.jpeg"));
  };

  return (
    <CardWrapper>
      <StyledImageContainer
        src={`https://practitioner-images.s3.eu-west-2.amazonaws.com/${practitionerData.imageReference}`}
        onError={defaultImage}
      />

      <InnerCardWrapper>
        <HeaderWrapper>
          <StyledHeader>
            {practitionerData.firstName + " " + practitionerData.lastName}
          </StyledHeader>
        </HeaderWrapper>
        <Wrapper>
          {" "}
          <StyledSubtitle bold>Disciplines</StyledSubtitle> &nbsp;{" "}
          <ChipWrapper>
            {practitionerData?.disciplines?.slice(0, 5).map((discipline) => {
              return <StyledChip label={discipline as unknown as string} />;
            })}
          </ChipWrapper>
        </Wrapper>
        <Wrapper>
          <StyledSubtitle bold>Health Concerns</StyledSubtitle> &nbsp;{" "}
          <ChipWrapper>
            {practitionerData?.healthConcerns
              ?.slice(0, 5)
              .map((healthConcern) => {
                return (
                  <StyledChip label={healthConcern as unknown as string} />
                );
              })}
          </ChipWrapper>
        </Wrapper>

        <P>{practitionerData.profile}</P>
        <LocationWrapper>
          {practitionerData?.distance && (
            <>
              <StyledLocationIcon />

              <P>
                {Math.floor(
                  Number(practitionerData.distance) * 0.000621371192
                ) +
                  " " +
                  "Miles Away"}
              </P>
            </>
          )}

          <IconButton color="primary" size="large">
            <Tooltip title={practitionerData.phoneNumber} enterTouchDelay={0}>
              <StyledIconBackdrop>
                <StyledPhoneIcon />
              </StyledIconBackdrop>
            </Tooltip>
          </IconButton>
          <IconButton color="primary" size="large">
            <Tooltip title={practitionerData.email} enterTouchDelay={0}>
              <StyledIconBackdrop>
                <StyledPersonIcon />
              </StyledIconBackdrop>
            </Tooltip>
          </IconButton>
          <IconButton color="primary" size="large">
            <Tooltip title={practitionerData.url} enterTouchDelay={0}>
              <StyledIconBackdrop>
                <StyledUrlIcon />
              </StyledIconBackdrop>
            </Tooltip>
          </IconButton>
        </LocationWrapper>
      </InnerCardWrapper>
    </CardWrapper>
  );
};

export default PractitionerCard;
