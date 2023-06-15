import styled from "styled-components";
import { Container } from "../../shared/components/Container";
import { StyledLink } from "../../shared/components/Link";
import { H1, H2, P } from "../../shared/styles";
import { Brand, BRANDS_DATA } from "./brandsData";

const StyledHeader = styled(H1)`
  text-align: center;
`;

const DividerLine = styled.div`
  height: 2px;
  background-color: var(--color-grey-dark);
  width: 100%;
  margin: var(--spacing-md);
`;

const BrandWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
  background-color: var(--color-white);
  border-radius: var(--border-radius);
  margin-bottom: var(--spacing-md);
  padding: var(--spacing-md);
`;

const ImageContainer = styled.img`
  height: 50%;
  width: 50%;
  margin-bottom: var(--spacing-md);
`;

const StyledBrandHeader = styled(H2)`
  margin-bottom: var(--spacing-md);
`;

const StyledText = styled(P)`
  width: 100%;
  margin-bottom: var(--spacing-md);
`;

const BrandsPage = () => {
  return (
    <Container>
      <StyledHeader>Meet the Brands</StyledHeader>
      <DividerLine />
      {BRANDS_DATA.map((brand: Brand) => {
        return (
          <>
            <BrandWrapper>
              <StyledBrandHeader>{brand.title}</StyledBrandHeader>
              <StyledText>{brand.profile}</StyledText>

              <ImageContainer src={brand.image} />
              <StyledLink to={brand.link} target="_blank">
                Company Link
              </StyledLink>
            </BrandWrapper>
            <DividerLine />
          </>
        );
      })}
    </Container>
  );
};

export default BrandsPage;
