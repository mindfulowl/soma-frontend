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
  inActiveIngredients: Array<string>;
  imageUrl: string;
};

type ProductCardProps = {
  productData: Product;
};

const ImageWrapper = styled.img`
  border-radius: var(--border-radius);
  max-height: 75%;
  max-width: 100%;
  font-size: var(--font-size-small);
  margin-top: var(--spacing-md);
  @media ${screenMdMin} {
    margin-top: 0;
    max-height: 100%;
    max-width: 100%;
  }
`;

const StyledHeader = styled(H4)`
  margin-bottom: var(--spacing-md);
  text-decoration: underline;
  @media ${screenMdMin} {
    font-size: 18px;
  }
`;

const StyledSubtitle = styled(H5)`
  font-size: var(--font-size-mobile);
  @media ${screenMdMin} {
    font-size: var(--font-size-p);
  }
`;

const StyledTextWrapper = styled.div`
  margin-bottom: var(--spacing-sm);
  display: flex;
  font-size: var(--font-size-small);
`;

const StyledText = styled(P)`
  font-size: var(--font-size-mobile);
  @media ${screenMdMin} {
    font-size: var(--font-size-p);
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

  useWindowResize(setSize);
  return (
    <CardWrapper>
      {screenSize === WindowSizeEnum.LARGE && (
        <ImageWrapper src={productData.imageUrl} />
      )}
      <InnerCardWrapper>
        <StyledHeader>{productData.name}</StyledHeader>
        <StyledTextWrapper>
          <StyledSubtitle bold>Active Ingredients:</StyledSubtitle> &nbsp;
          <StyledText>
            {" "}
            {productData.activeIngredients.map((name) => name).join(", ")}
          </StyledText>
        </StyledTextWrapper>
        <StyledTextWrapper>
          <StyledSubtitle bold> Inactive Ingredients: </StyledSubtitle> &nbsp;
          <StyledText>
            {productData.inActiveIngredients.map((name) => name).join(", ")}
          </StyledText>
        </StyledTextWrapper>
        <StyledLink to="/">Buy Product</StyledLink>
      </InnerCardWrapper>
      {screenSize === WindowSizeEnum.SMALL && (
        <ImageWrapper src={productData.imageUrl} />
      )}
    </CardWrapper>
  );
};

export default ProductCard;
