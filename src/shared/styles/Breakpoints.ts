export const getWidthMinMediaQuery = (width: number): string =>
  `(min-width: ${`${width}px`})`;

const Breakpoints = {
  xxs: 410,
  xs: 480,
  sm: 576,
  md: 720,
  lg: 1024,
  xl: 1344,
  ultra: 1920,
};

export const screenXxsMin = getWidthMinMediaQuery(Breakpoints.xxs);
export const screenXsMin = getWidthMinMediaQuery(Breakpoints.xs);
export const screenSmMin = getWidthMinMediaQuery(Breakpoints.sm);
export const screenMdMin = getWidthMinMediaQuery(Breakpoints.md);
export const screenLgMin = getWidthMinMediaQuery(Breakpoints.lg);
export const screenXlMin = getWidthMinMediaQuery(Breakpoints.xl);
export const screenUltraMin = getWidthMinMediaQuery(Breakpoints.ultra);

export default Breakpoints;
