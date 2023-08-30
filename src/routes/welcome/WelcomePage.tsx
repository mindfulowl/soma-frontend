import { useState, useCallback, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../shared/contexts/UserContext";
import useWindowResize, {
  WindowSizeEnum,
  Dimensions,
} from "../../shared/hooks/useWindowResize";
import { Breakpoints, screenMdMin } from "../../shared/styles";
import NavCard from "./components/NavCard";
import {
  MEMBERSHIP_DATA,
  NAV_CARD_DATA,
  PRACTITIONER_MOBILE,
} from "./types/welcome.types";

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
  const [screenSize, setScreenSize] = useState<WindowSizeEnum>(
    window.innerWidth > Breakpoints.md
      ? WindowSizeEnum.LARGE
      : WindowSizeEnum.SMALL
  );

  const { currentUser } = useContext(UserContext);

  const setSize = useCallback((dimensions: Dimensions) => {
    if (dimensions.width > Breakpoints.md) {
      setScreenSize(WindowSizeEnum.LARGE);
    } else {
      setScreenSize(WindowSizeEnum.SMALL);
    }
  }, []);

  useWindowResize(setSize);

  console.log(currentUser);
  return (
    <>
      <ImageContainer
        src={require("../../assets/images/mindfulOwlWithText.png")}
      />

      {screenSize === WindowSizeEnum.SMALL && (
        <NavCard navCardData={PRACTITIONER_MOBILE} />
      )}

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
