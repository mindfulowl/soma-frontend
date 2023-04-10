import styled from "styled-components";
import { Button as MuiButton } from "@mui/material";

type ButtonProps = {
  label: string;
  type: "button" | "submit" | "reset";
  variant?: "text" | "outlined" | "contained";
  disabled?: boolean;
  onClick?: (args: any) => void;
  name?: string;

  fullWidth?: boolean;
};

const StyledButton = styled(MuiButton)`
  border-radius: var(--border-radius-18);
  width: 200px;
  margin: var(--spacing-sm);
`;

const Button = (props: ButtonProps) => {
  const { label, disabled, variant, fullWidth, onClick, name, type } = props;
  return (
    <StyledButton
      variant={variant}
      disabled={disabled}
      onClick={(e) => onClick && onClick(e)}
      fullWidth={fullWidth}
      name={name}
      type={type}
    >
      {label}
    </StyledButton>
  );
};

export default Button;
