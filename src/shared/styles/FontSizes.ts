import { css } from "styled-components";
import { screenSmMin, screenLgMin } from "./Breakpoints";

const FontSizes = {
  fontSizeUltraSm: "3rem", // 48px
  fontSizeUltraMd: "4rem", // 64px
  fontSizeUltraLg: "5rem", // 80px
  lineHeightUltra: "1.25",
  fontSizeH1Sm: "2rem", // 32px
  fontSizeH1Md: "2.5rem", // 40px
  fontSizeH1Lg: "3rem", // 48px
  lineHeightH1: "1.25",
  fontSizeH2Sm: "1.625rem", // 26px
  fontSizeH2Md: "2rem", // 32px
  fontSizeH2Lg: "2.25rem", // 36px
  lineHeightH2: "1.25",
  fontSizeH3Sm: "1.375rem", // 22px
  fontSizeH3Md: "1.5rem", // 24px
  fontSizeH3Lg: "1.75rem", // 28px
  lineHeightH3: "1.25",
  fontSizeH4Sm: "1.25rem", // 20px
  fontSizeH4Md: "1.375rem", // 22px
  fontSizeH4Lg: "1.5rem", // 24px
  lineHeightH4: "1.25",
  fontSizeH5Sm: "1.125rem", // 18px
  fontSizeH5Md: "1.25rem", // 20px
  fontSizeH5Lg: "1.25rem", // 20px
  lineHeightH5: "1.25",
  fontSizePSm: "1rem", // 16px
  fontSizePMd: "1rem", // 16px
  fontSizePLg: "1rem", // 16px
  lineHeightP: `1.5`,
  fontSizeSmallSm: "0.75rem", // 12px
  fontSizeSmallMd: "0.75rem", // 12px
  fontSizeSmallLg: "0.75rem", // 12px
  lineHeightSmall: `1.5`,
  iconLargeSize: "3.2rem",
};

export const fontSizeCSSVars = css`
  // Ultra
  --font-size-ultra: ${FontSizes.fontSizeUltraSm};
  --line-height-ultra: ${FontSizes.lineHeightUltra};

  --font-size-ultra-sm: ${FontSizes.fontSizeUltraSm};
  --font-size-ultra-md: ${FontSizes.fontSizeUltraMd};
  --font-size-ultra-lg: ${FontSizes.fontSizeUltraLg};

  // H1
  --font-size-h1: ${FontSizes.fontSizeH1Sm};
  --line-height-h1: ${FontSizes.lineHeightH1};

  --font-size-h1-sm: ${FontSizes.fontSizeH1Sm};
  --font-size-h1-md: ${FontSizes.fontSizeH1Md};
  --font-size-h1-lg: ${FontSizes.fontSizeH1Lg};

  // H2
  --font-size-h2: ${FontSizes.fontSizeH2Sm};
  --line-height-h2: ${FontSizes.lineHeightH2};

  --font-size-h2-sm: ${FontSizes.fontSizeH2Sm};
  --font-size-h2-md: ${FontSizes.fontSizeH2Md};
  --font-size-h2-lg: ${FontSizes.fontSizeH2Lg};

  // H3
  --font-size-h3: ${FontSizes.fontSizeH3Sm};
  --line-height-h3: ${FontSizes.lineHeightH3};

  --font-size-h3-sm: ${FontSizes.fontSizeH3Sm};
  --font-size-h3-md: ${FontSizes.fontSizeH3Md};
  --font-size-h3-lg: ${FontSizes.fontSizeH3Lg};

  // H4
  --font-size-h4: ${FontSizes.fontSizeH4Sm};
  --line-height-h4: ${FontSizes.lineHeightH4};

  --font-size-h4-sm: ${FontSizes.fontSizeH4Sm};
  --font-size-h4-md: ${FontSizes.fontSizeH4Md};
  --font-size-h4-lg: ${FontSizes.fontSizeH4Lg};

  // H5
  --font-size-h5: ${FontSizes.fontSizeH5Sm};
  --line-height-h5: ${FontSizes.lineHeightH5};

  --font-size-h5-sm: ${FontSizes.fontSizeH5Sm};
  --font-size-h5-md: ${FontSizes.fontSizeH5Md};
  --font-size-h5-lg: ${FontSizes.fontSizeH5Lg};

  // P
  --font-size-p: ${FontSizes.fontSizePSm};
  --line-height-p: ${FontSizes.lineHeightP};

  --font-size-p-sm: ${FontSizes.fontSizePSm};
  --font-size-p-md: ${FontSizes.fontSizePMd};
  --font-size-p-lg: ${FontSizes.fontSizePLg};

  // SMALL
  --font-size-small: ${FontSizes.fontSizeSmallSm};
  --line-height-small: ${FontSizes.lineHeightSmall};

  --font-size-small-sm: ${FontSizes.fontSizeSmallSm};
  --font-size-small-md: ${FontSizes.fontSizeSmallMd};
  --font-size-small-lg: ${FontSizes.fontSizeSmallLg};

  // ICON SIZES

  --icon-size-large: ${FontSizes.iconLargeSize};

  @media ${screenSmMin} {
    --font-size-ultra: ${FontSizes.fontSizeUltraMd};
    --font-size-h1: ${FontSizes.fontSizeH1Md};
    --font-size-h2: ${FontSizes.fontSizeH2Md};
    --font-size-h3: ${FontSizes.fontSizeH3Md};
    --font-size-h4: ${FontSizes.fontSizeH4Md};
    --font-size-h5: ${FontSizes.fontSizeH5Md};
  }
  @media ${screenLgMin} {
    --font-size-ultra: ${FontSizes.fontSizeUltraLg};
    --font-size-h1: ${FontSizes.fontSizeH1Lg};
    --font-size-h2: ${FontSizes.fontSizeH2Lg};
    --font-size-h3: ${FontSizes.fontSizeH3Lg};
    --font-size-h4: ${FontSizes.fontSizeH4Lg};
    --font-size-h5: ${FontSizes.fontSizeH5Lg};
  }
`;

export default FontSizes;
