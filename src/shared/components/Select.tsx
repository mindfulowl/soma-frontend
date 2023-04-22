import { MenuItem, TextField, ListItemText } from "@mui/material";
import styled from "styled-components";

type SelectOption = {
  name: string;
};

type SelectProps = {
  options: Array<SelectOption>;
  label: string;
};

const StyledSelect = styled(TextField)`
  width: 180px;
`;

const Select = (props: SelectProps) => {
  const { options, label } = props;
  return (
    <StyledSelect label={label} select variant="outlined">
      {options.map((option: SelectOption) => {
        return (
          <MenuItem value={option.name} key={option.name}>
            <ListItemText primary={option.name} />
          </MenuItem>
        );
      })}
    </StyledSelect>
  );
};

export default Select;
