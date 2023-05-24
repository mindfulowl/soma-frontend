import { Chip } from "@mui/material";
import { useState, useCallback } from "react";
import styled from "styled-components";
import { StyledLink } from "../../../shared/components/Link";
import useWindowResize, {
  Dimensions,
  WindowSizeEnum,
} from "../../../shared/hooks/useWindowResize";
import { Breakpoints, H4, H5, P, screenMdMin } from "../../../shared/styles";
import {
  CardWrapper,
  InnerCardWrapper,
} from "../../../shared/styles/cardStyles/CardStyles";

export type Product = {
  name: string;
  activeIngredients: Array<string>;
  inactiveIngredients: Array<string>;
  healthConcerns: Array<string>;
  url: string;
  image: string;
};

type ProductCardProps = {
  productData: Product;
};

const ImageWrapper = styled.img`
  border-radius: var(--border-radius);
  font-size: var(--font-size-small);
  margin-top: var(--spacing-md);
  height: 30%;
  width: 100%;
  @media ${screenMdMin} {
    margin-top: 0;
    height: 85%;
    max-width: 45%;
  }
`;

const StyledHeader = styled(H4)`
  margin-bottom: var(--spacing-md);
  text-decoration: underline;
  @media ${screenMdMin} {
    font-size: 18px;
  }
`;

const HealthConcernWrapper = styled.div`
  justify-content: space-between;
`;

const StyledSubtitle = styled(H5)`
  font-size: var(--font-size-small);
  @media ${screenMdMin} {
    font-size: var(--font-size-mobile);
    max-width: 75px;
  }
`;

const StyledTextWrapper = styled.div`
  margin-bottom: var(--spacing-md);
  display: flex;
`;

const StyledChip = styled(Chip)`
  margin-bottom: var(--spacing-sm);
  @media ${screenMdMin} {
    margin-top: var(--spacing-sm);
    margin-bottom: 0;
  }
`;

const StyledText = styled(P)`
  font-size: var(--font-size-small);
  @media ${screenMdMin} {
    display: flex;
    margin-left: var(--spacing-md);
  }
`;

const ProductCard = (props: ProductCardProps) => {
  const { productData } = props;

  const [screenSize, setScreenSize] = useState<WindowSizeEnum>(
    window.innerWidth > Breakpoints.md
      ? WindowSizeEnum.LARGE
      : WindowSizeEnum.SMALL
  );

  const setSize = useCallback((dimensions: Dimensions) => {
    if (dimensions.width > Breakpoints.md) {
      setScreenSize(WindowSizeEnum.LARGE);
    } else {
      setScreenSize(WindowSizeEnum.SMALL);
    }
  }, []);

  const productImage = require("../../../assets/images/productImage.webp");

  useWindowResize(setSize);

  return (
    <CardWrapper>
      {screenSize === WindowSizeEnum.LARGE && (
        <ImageWrapper
          src={productData.image ? productData.image : productImage}
        />
      )}
      <InnerCardWrapper>
        <StyledHeader>{productData.name}</StyledHeader>
        <StyledTextWrapper>
          <StyledSubtitle bold>Active Ingredients:</StyledSubtitle> &nbsp;
          <StyledText>
            {productData.activeIngredients.length > 0 &&
              productData.activeIngredients.map((name) => name).join(", ")}
          </StyledText>
        </StyledTextWrapper>
        <StyledTextWrapper>
          <StyledSubtitle bold>Inactive Ingredients: </StyledSubtitle> &nbsp;
          <StyledText>
            {productData.inactiveIngredients.length === 0
              ? "N/A"
              : productData.inactiveIngredients.map((name) => name).join(", ")}
          </StyledText>
        </StyledTextWrapper>
        <StyledTextWrapper>
          <StyledSubtitle bold>Health Concerns: </StyledSubtitle> &nbsp;
          <StyledText>
            {productData.healthConcerns.length === 0
              ? "N/A"
              : productData.healthConcerns.map((healthConcern, i) => (
                  <HealthConcernWrapper>
                    <StyledChip label={healthConcern} key={i} />
                    &nbsp;
                  </HealthConcernWrapper>
                ))}
          </StyledText>
        </StyledTextWrapper>

        <StyledLink to={productData.url} target="_blank">
          Buy Product
        </StyledLink>
      </InnerCardWrapper>
      {screenSize === WindowSizeEnum.SMALL && (
        <ImageWrapper src={productData.image ?? productImage} />
      )}
    </CardWrapper>
  );
};

export default ProductCard;
