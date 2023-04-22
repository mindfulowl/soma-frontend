import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../shared/contexts/UserContext";
import { screenMdMin } from "../../shared/styles";
import NavCard from "./components/NavCard";
import { NAV_CARD_DATA } from "./types/welcome.types";

const ImageContainer = styled.img`
  max-height: 80vh;
  width: 100%;
`;

const NavCardWrapper = styled.div`
  flex-direction: column;
  @media ${screenMdMin} {
    flex-direction: row;
    padding-bottom: var(--spacing-md);
    display: flex;
    justify-content: space-between;
  }
`;

const WelcomePage = () => {
  const { currentUser } = useContext(UserContext);
  console.log(currentUser);
  return (
    <>
      <ImageContainer
        src={require("../../assets/images/mindfulOwlImage.jpg")}
      />

      <NavCardWrapper>
        {NAV_CARD_DATA.map((navCardData) => {
          return <NavCard key={navCardData.title} navCardData={navCardData} />;
        })}
      </NavCardWrapper>
    </>
  );
};

export default WelcomePage;
