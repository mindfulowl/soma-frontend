import { css } from "styled-components";
import { screenLgMin } from "./Breakpoints";

const Spacing = {
  smallXs: 4,
  smallSm: 8,
  smallMd: 16,
  smallLg: 32,
  smallXl: 64,
  largeXs: 6,
  largeSm: 12,
  largeMd: 24,
  largeLg: 48,
  largeXl: 96,
};

export const spacingCSSVars = css`
  --spacing-small-xs: ${`${Spacing.smallXs}px`};
  --spacing-small-sm: ${`${Spacing.smallSm}px`};
  --spacing-small-md: ${`${Spacing.smallMd}px`};
  --spacing-small-lg: ${`${Spacing.smallLg}px`};
  --spacing-small-xl: ${`${Spacing.smallXl}px`};
  --spacing-large-xs: ${`${Spacing.largeXs}px`};
  --spacing-large-sm: ${`${Spacing.largeSm}px`};
  --spacing-large-md: ${`${Spacing.largeMd}px`};
  --spacing-large-lg: ${`${Spacing.largeLg}px`};
  --spacing-large-xl: ${`${Spacing.largeXl}px`};

  --spacing-xs: ${`${Spacing.smallXs}px`};
  --spacing-sm: ${`${Spacing.smallSm}px`};
  --spacing-md: ${`${Spacing.smallMd}px`};
  --spacing-lg: ${`${Spacing.smallLg}px`};
  --spacing-xl: ${`${Spacing.smallXl}px`};

  @media ${screenLgMin} {
    --spacing-xs: ${`${Spacing.largeXs}px`};
    --spacing-sm: ${`${Spacing.largeSm}px`};
    --spacing-md: ${`${Spacing.largeMd}px`};
    --spacing-lg: ${`${Spacing.largeLg}px`};
    --spacing-xl: ${`${Spacing.largeXl}px`};
  }
`;

export default Spacing;
