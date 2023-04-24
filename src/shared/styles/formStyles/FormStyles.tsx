import { Avatar, Box } from "@mui/material";
import styled from "styled-components";

export const StyledAvatarWrapper = styled(Avatar)`
  background-color: var(--color-deep-purple);
  width: 50px;
  height: 45px;
  margin: var(--spacing-md);
`;

export const StyledFormContainer = styled(Box)`
  margin-top: var(--spacing-xs);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
