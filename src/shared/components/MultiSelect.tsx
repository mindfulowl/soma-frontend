import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export type MultiSelectOption = {
  name: string;
};

type MultiSelectProps = {
  options?: Array<MultiSelectOption>;
  label: string;
  currentValue: Array<MultiSelectOption> | null;
  handleChange: (newValue: Array<MultiSelectOption>) => void;
  required?: boolean;
};

const MultiSelect = (props: MultiSelectProps) => {
  const { options, label, handleChange, required, currentValue } = props;

  return (
    <Autocomplete
      multiple
      defaultValue={currentValue || undefined}
      fullWidth
      onChange={(e, v: Array<MultiSelectOption>) => {
        handleChange(v);
      }}
      options={options || []}
      getOptionLabel={(option: MultiSelectOption) => option.name}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          required={required}
          {...params}
          variant="outlined"
          label={label}
        />
      )}
    />
  );
};

export default MultiSelect;
