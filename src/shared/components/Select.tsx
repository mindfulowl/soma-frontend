import { MenuItem, TextField, ListItemText } from "@mui/material";

type SelectOption = {
  name: string;
};

type SelectProps = {
  options: Array<SelectOption>;
  label: string;
  name: string;
  currentValue: string;
  required: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
};



const Select = (props: SelectProps) => {
  const { options, label, onChange, name, currentValue, required } = props;
  return (
    <TextField
      label={label}
      select
      variant="outlined"
      fullWidth
      required={required}
      value={currentValue ?? null}
      name={name}
      onChange={(
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      ) => onChange(e)}
    >
      {options.map((option: SelectOption) => {
        return (
          <MenuItem value={option.name} key={option.name}>
            <ListItemText primary={option.name} />
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default Select;
