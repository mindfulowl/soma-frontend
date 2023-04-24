import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { MuiStyledOptions } from "@mui/system";

export type MultiSelectOption = {
  name: string;
};

type MultiSelectProps = {
  options: Array<MultiSelectOption>;
  label: string;
  currentValue: Array<MultiSelectOption> | null;
  handleChange: (newValue: Array<MultiSelectOption>) => void;
};

const MultiSelect = (props: MultiSelectProps) => {
  const { options, label, handleChange, currentValue } = props;

  console.log(currentValue);

  return (
    <Autocomplete
      multiple
      fullWidth
      onChange={(e, v: Array<MultiSelectOption>) => {
        console.log(v);
        handleChange(v);
      }}
      options={options}
      getOptionLabel={(option: MultiSelectOption) => option.name}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField required={currentValue === null} {...params} label={label} />
      )}
    />
  );
};

export default MultiSelect;
