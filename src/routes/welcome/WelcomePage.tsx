import { useContext } from "react";
import styled from "styled-components";
import { Container } from "../../shared/ components/Container";
import { UserContext } from "../../shared/contexts/UserContext";
import { H2 } from "../../shared/styles";

const ImageContainer = styled.img`
  max-height: 80vh;
  width: 100%;
`;

const Subtitle = styled(H2)`
  color: var(--color-gold-font);
`;

const WelcomePage = () => {
  const { currentUser } = useContext(UserContext);
  console.log(currentUser);
  return (
    <>
      <ImageContainer
        src={require("../../assets/images/mindfulOwlImage.jpg")}
      />
      <Container>
        <Subtitle>Our Membership</Subtitle>
      </Container>
    </>
  );
};

export default WelcomePage;
