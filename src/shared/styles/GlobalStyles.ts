import { createGlobalStyle, css } from "styled-components";

import { colorsCSSVars } from "./Colors";
import { globalVariablesCSSVars } from "./GlobalVariables";
import { spacingCSSVars } from "./Spacing";
import { typographyCSS } from "./Typography";
import { fontSizeCSSVars } from "./FontSizes";

const normalizeCSS = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  a {
    color: revert;
  }

  table {
    border-collapse: collapse;
  }

  th {
    text-align: left;
  }
`;

export default createGlobalStyle`
  :root {
    ${colorsCSSVars}
    ${spacingCSSVars}
    ${globalVariablesCSSVars}
    ${fontSizeCSSVars}
  }

  ${typographyCSS}
  ${normalizeCSS}
`;
