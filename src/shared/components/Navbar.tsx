import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js";
import { UserPoolData } from "../../routes/authentication/types/types.auth";
import { StyledLink } from "./Link";

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

const Navbar = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

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

  return (
    <NavigationContainer>
      <StyledLink to="/">
        <StyledImage src={require("../../assets/images/logo.png")} />
      </StyledLink>

      <NavLinks>
        <StyledLink to="/events" marginRight>
          Events
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
