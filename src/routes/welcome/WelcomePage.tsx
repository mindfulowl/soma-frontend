import styled from "styled-components";
import { screenMdMin } from "../../shared/styles";
import NavCard from "./components/NavCard";
import { MEMBERSHIP_DATA, NAV_CARD_DATA } from "./types/welcome.types";

const ImageContainer = styled.img`
  max-height: 80vh;
  width: 100%;
`;

export const NavCardWrapper = styled.div`
  flex-direction: column;
  @media ${screenMdMin} {
    flex-direction: row;
    padding-bottom: var(--spacing-md);
    display: flex;
    justify-content: space-between;
  }
`;

const WelcomePage = () => {
  return (
    <>
      <ImageContainer
        src={require("../../assets/images/mindfulOwlWithText.png")}
      />

      <NavCardWrapper>
        {NAV_CARD_DATA.map((navCardData) => {
          return <NavCard key={navCardData.title} navCardData={navCardData} />;
        })}
      </NavCardWrapper>
      <NavCard navCardData={MEMBERSHIP_DATA} />
    </>
  );
};

export default WelcomePage;
