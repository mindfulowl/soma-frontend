import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import styled from "styled-components";

type MultiSelectOption = {
  name: string;
};

type MultiSelectProps = {
  options: Array<MultiSelectOption>;
  label: string;
};

const StyledAutoComplete = styled(TextField)`
  width: 350px;
`;

const MultiSelect = (props: MultiSelectProps) => {
  const { options, label } = props;
  return (
    <Autocomplete
      multiple
      options={options}
      getOptionLabel={(option: MultiSelectOption) => option.name}
      defaultValue={[options[0]]}
      filterSelectedOptions
      renderInput={(params) => <StyledAutoComplete {...params} label={label} />}
    />
  );
};

export default MultiSelect;
