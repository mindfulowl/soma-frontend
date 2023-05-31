import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js";
import { UserPoolData } from "../../routes/authentication/types/types.auth";
import { StyledLink } from "./Link";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
`;

const NavigationContainer = styled.div`
  height: 110px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: var(--color-white);
  padding: var(--spacing-md);
`;

const StyledImage = styled.img`
  cursor: pointer;
  height: 105px;
  padding-bottom: var(--spacing-md);
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledPracButton = styled(Button)`
  color: var(--color-black);
  border: 2px solid var(--color-grey-light);
  border-radius: 20px;
  font-size: var(--font-size-medium-sm);
  margin: var(--spacing-xs) 0;
  margin-top: var(--spacing-sm);

  :hover {
    border: 2px solid var(--color-grey-light);
  }
`;

const Navbar = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const user =
    currentUser &&
    new CognitoUser({
      Username: currentUser?.email || "",
      Pool: new CognitoUserPool(UserPoolData),
    });

  const signOut = () => {
    user?.signOut();
    setCurrentUser(null);
  };

  const navToPracSignUp = () => navigate("practitioner-sign-up");

  return (
    <NavigationContainer>
      <Wrapper>
        <StyledLink to="/">
          <StyledImage src={require("../../assets/images/logo.png")} />
        </StyledLink>
        {currentUser && (
          <StyledPracButton variant="outlined" onClick={navToPracSignUp}>
            Become A Practitioner
          </StyledPracButton>
        )}
      </Wrapper>

      <NavLinks>
        <StyledLink to="/practitioner-search" marginRight>
          Practitioners
        </StyledLink>
        <StyledLink to="/news" marginRight>
          News
        </StyledLink>
        {!currentUser ? (
          <StyledLink to="/sign-in" marginRight>
            Sign In
          </StyledLink>
        ) : (
          <StyledLink to="/sign-in" marginRight onClick={() => signOut()}>
            Sign Out
          </StyledLink>
        )}
      </NavLinks>
    </NavigationContainer>
  );
};

export default Navbar;
