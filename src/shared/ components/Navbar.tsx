import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { screenMdMin } from "../styles";

const NavigationContainer = styled.div`
  height: 90px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: var(--color-grey-light);
  padding: var(--spacing-md);
`;

const StyledHomeIcon = styled(HomeOutlinedIcon)`
  color: var(--color-black);
  margin-top: var(--spacing-md);
  @media ${screenMdMin} {
    font-size: var(--font-size-h1);
    margin-top: 0;
  }
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
  return (
    <>
      <NavigationContainer>
        <NavLink to="/products">
          <StyledHomeIcon />
        </NavLink>

        <NavLinks>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/news">News</NavLink>
          <NavLink to="/sign-in">Sign In</NavLink>
        </NavLinks>
      </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navbar;
