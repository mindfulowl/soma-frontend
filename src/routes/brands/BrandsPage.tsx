import { Divider } from "@mui/material";
import styled from "styled-components";
import { Container } from "../../shared/components/Container";
import { H1 } from "../../shared/styles";

const StyledHeader = styled(H1)`
  text-align: center;
`;

const DividerLine = styled.div`
  height: 2px;
  background-color: var(--color-grey-dark);
  width: 100%;
  margin: var(--spacing-md);
`;

const BrandsPage = () => {
  return (
    <Container>
      <StyledHeader>Meet the Brands</StyledHeader>
      <DividerLine />
    </Container>
  );
};

export default BrandsPage;
