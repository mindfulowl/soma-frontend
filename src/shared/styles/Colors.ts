import { css } from "styled-components";

const Colors = {
  black: "#000000",
  greyDarker: "#4f4f4f",
  greyDark: "#6d6d6d",
  grey: "#e8e8e8",
  greyLight: "#f2f2f2",
  white: "#ffffff",
  red: "#da071c",
  green: "#0f882b",
  successGreen: "#13A935",
  yellow: "#ffc01e",
  deepPurple: "#9C27B0",
  goldFont: "#D4AF37",
};

export const colorsCSSVars = css`
  --color-black: ${Colors.black};
  --color-grey-darker: ${Colors.greyDarker};
  --color-grey-dark: ${Colors.greyDark};
  --color-grey: ${Colors.grey};
  --color-grey-light: ${Colors.greyLight};
  --color-white: ${Colors.white};
  --color-red: ${Colors.red};
  --color-green: ${Colors.green};
  --color-success-green: ${Colors.successGreen};
  --color-yellow: ${Colors.yellow};
  --color-deep-purple: ${Colors.deepPurple};
  --color-gold-font: ${Colors.goldFont};
`;

export default Colors;
