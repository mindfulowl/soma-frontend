import styled from "styled-components";
import { screenMdMin } from "../Breakpoints";

export const CardWrapper = styled.div`
  background-color: var(--color-white);
  border-radius: var(--border-radius);
  margin-bottom: var(--spacing-md);
  padding: var(--spacing-md);
  @media ${screenMdMin} {
    display: flex;
    align-items: center;
    height: 300px;
  }
`;

export const InnerCardWrapper = styled.div`
  flex-direction: column;
  @media ${screenMdMin} {
    margin-left: var(--spacing-md);
  }
`;
