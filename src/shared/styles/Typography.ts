import React from "react";
import styled, { css } from "styled-components";

type TypographyProps = {
  bold?: boolean;
  children?: any;
};

const getTypographyCSS = (tagName: string) => css`
  font-family: "Gilmer";
  font-size: ${`var(--font-size-${tagName})`};
  line-height: ${`var(--line-height-${tagName})`};
  margin: 0 0 0 0;
  max-width: var(--max-line-length);
`;

const ultraCSS = getTypographyCSS("ultra");
const h1CSS = getTypographyCSS("h1");
const h2CSS = getTypographyCSS("h2");
const h3CSS = getTypographyCSS("h3");
const h4CSS = getTypographyCSS("h4");
const h5CSS = getTypographyCSS("h5");
const pCSS = getTypographyCSS("p");
const smallCSS = getTypographyCSS("small");

export const H1 = styled.h1<TypographyProps>`
  font-weight: 600;
  ${h1CSS}
`;

export const H2 = styled.h2<TypographyProps>`
  font-weight: 600;
  font-family: "Gilmer";
  ${h2CSS}
`;

export const H3 = styled.h3<TypographyProps>`
  font-family: "Gilmer";
  font-weight: 600;
  ${h3CSS}
`;

export const H4 = styled.h4<TypographyProps>`
  font-weight: ${(props) => (props.bold ? "600" : "normal")};
  font-weight: 600;
  font-family: "Gilmer-Medium";
  ${h4CSS}
`;

export const H5 = styled.h5<TypographyProps>`
  font-weight: ${(props) => (props.bold ? "600" : "normal")};
  font-family: "Gilmer";
  ${h5CSS}
`;

export const P = styled.p<TypographyProps>`
  font-weight: ${(props) => (props.bold ? "600" : "normal")};
  font-family: ${(props) => (props.bold ? "Gilmer-Medium" : "Gilmer")};
  ${pCSS}
  margin: 0 0 0 0;
`;

export const Small = styled.small<TypographyProps>`
  font-weight: ${(props) => (props.bold ? "600" : "normal")};
  font-family: "Gilmer";
  ${smallCSS}
  margin: 0;
`;

export const typographyCSS = css`
  .ultra {
    ${ultraCSS}
  }

  h1,
  .h1,
  .h1-b {
    font-weight: 600;
    ${h1CSS}
  }

  h2,
  .h2,
  .h2-b {
    font-weight: 600;
    ${h2CSS}
  }

  h3,
  .h3 {
    font-weight: 600;
    ${h3CSS}
  }

  h4,
  .h4,
  .h4-b {
    font-weight: normal;
    ${h4CSS}
  }

  h5,
  .h5,
  .h5-b {
    font-weight: normal;
    ${h5CSS}
  }

  p,
  .p,
  .p-b {
    ${pCSS}
    font-family: "Gilmer";
    margin: 0 0 1rem 0;
  }

  small,
  .small,
  .small-b {
    ${smallCSS}
    margin: 0;
  }

  .h1-b,
  .h2-b,
  .h4-b,
  .h5-b,
  .p-b,
  .small-b {
    font-family: "Gilmer";
    font-weight: 600;
  }
`;
