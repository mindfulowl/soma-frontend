import { Chip } from "@mui/material";
import { useState, useCallback, SyntheticEvent } from "react";
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
  activeIngredientsWithQuantity: Array<string>;
  inactiveIngredients: Array<string>;
  healthConcerns: Array<string>;
  url: string;
  image?: string;
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
    height: 60%;
    max-width: 35%;
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

  const defaultImage = (ev: SyntheticEvent<HTMLImageElement, Event>) => {
    return ((
      ev.target as HTMLImageElement
    ).src = require("../../../assets/images/productImage.webp"));
  };

  useWindowResize(setSize);

  return (
    <CardWrapper>
      {screenSize === WindowSizeEnum.LARGE && (
        <ImageWrapper
          src={`https://product-card-images.s3.eu-west-2.amazonaws.com/${productData.image}.jpg`}
          onError={defaultImage}
        />
      )}
      <InnerCardWrapper>
        <StyledHeader>{productData.name}</StyledHeader>
        <StyledTextWrapper>
          <StyledSubtitle bold>Active Ingredients:</StyledSubtitle> &nbsp;
          <StyledText>
            {productData.activeIngredientsWithQuantity.length > 0 &&
              productData.activeIngredientsWithQuantity
                .map((name) => name)
                .join(", ")}
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
          {productData.healthConcerns.length === 0
            ? "N/A"
            : productData.healthConcerns
                .slice(0, 5)
                .filter((healthConcern) => healthConcern.length > 1)
                .map((healthConcern, i) => (
                  <HealthConcernWrapper>
                    <StyledChip label={healthConcern} key={i} />
                    &nbsp;
                  </HealthConcernWrapper>
                ))}
        </StyledTextWrapper>

        {productData.healthConcerns.length > 5 && (
          <StyledTextWrapper>
            <StyledSubtitle bold>Health Concerns Cont. </StyledSubtitle> &nbsp;
            {productData.healthConcerns.length === 0
              ? "N/A"
              : productData.healthConcerns
                  .slice(6, productData.healthConcerns.length)
                  .filter((healthConcern) => healthConcern.length > 1)
                  .map((healthConcern, i) => (
                    <HealthConcernWrapper>
                      <StyledChip label={healthConcern} key={i} />
                      &nbsp;
                    </HealthConcernWrapper>
                  ))}
          </StyledTextWrapper>
        )}

        <StyledLink to={productData.url} target="_blank">
          Go To Product
        </StyledLink>
      </InnerCardWrapper>
      {screenSize === WindowSizeEnum.SMALL && (
        <ImageWrapper
          src={`https://product-card-images.s3.eu-west-2.amazonaws.com/${productData.image}.jpg`}
          onError={defaultImage}
        />
      )}
    </CardWrapper>
  );
};

export default ProductCard;
