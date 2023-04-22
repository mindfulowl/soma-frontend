import { Link } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js";
import { UserPoolData } from "../../routes/authentication/types/types.auth";

const NavigationContainer = styled.div`
  height: 110px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: var(--color-grey-light);
  padding: var(--spacing-md);
`;

const StyledImage = styled.img`
  cursor: pointer;
  height: 105px;
  padding-bottom: var(--spacing-md);
`;

const NavLinks = styled.div`
  display: flex;
  background-color: var(--color-grey-light);
  align-items: center;
  justify-content: flex-end;
`;

const NavLink = styled(Link)`
  padding: 0 var(--spacing-sm);
  text-decoration: none;
  color: var(--color-black);
  cursor: pointer;
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
      <NavLink to="/welcome">
        <StyledImage src={require("../../assets/images/NavbarLogo.png")} />
      </NavLink>

      <NavLinks>
        <NavLink to="/events">Events</NavLink>
        <NavLink to="/news">News</NavLink>
        {!currentUser ? (
          <NavLink to="/sign-in">Sign In</NavLink>
        ) : (
          <NavLink to="/sign-in" onClick={() => signOut()}>
            Sign Out
          </NavLink>
        )}
      </NavLinks>
    </NavigationContainer>
  );
};

export default Navbar;
