import { css } from "styled-components";

const GlobalVariables = {
  borderRadius: "4px",
  borderRadius8: "8px",
  borderRadius18: "18px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  boxShadow25: "0px 0px 10px rgba(0, 0, 0, 0.25)",
  stripedBackgroundImage:
    "repeating-linear-gradient(45deg, transparent, transparent 28px, rgba(189, 189, 189, 0.2) 28px, rgba(189, 189, 189, 0.2) 30px)",
  // We are using rem instead em because although we could allow larger text to be longer
  // we want to keep all text in line
  maxLineLength: "44rem",
};

export const globalVariablesCSSVars = css`
  --border-radius: ${GlobalVariables.borderRadius};
  --border-radius-8: ${GlobalVariables.borderRadius8};
  --border-radius-18: ${GlobalVariables.borderRadius18};
  --box-shadow: ${GlobalVariables.boxShadow};
  --box-shadow-25: ${GlobalVariables.boxShadow25};
  --max-line-length: ${GlobalVariables.maxLineLength};
  --striped-background-image: ${GlobalVariables.stripedBackgroundImage};
`;

export default GlobalVariables;
