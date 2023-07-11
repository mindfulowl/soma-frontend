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
    max-width: 100%;
    height: 500px;
  }
`;

export const InnerCardWrapper = styled.div`
  flex-direction: column;
  @media ${screenMdMin} {
    margin-left: var(--spacing-md);
  }
`;
