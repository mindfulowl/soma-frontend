import { useRef } from "react";
import { TextField } from "@mui/material";
import { StandaloneSearchBox } from "@react-google-maps/api";

type AddressAutoCompleteProps = {
  setAddress: (address: string) => void;
  addressValue: string;
};

const AddressAutoComplete = (props: AddressAutoCompleteProps) => {
  const { setAddress, addressValue } = props;
  const inputRef: any = useRef(null);

  const handlePlaceChanged = () => {
    if (inputRef.current !== null && addressValue) {
      const [place] = inputRef?.current.getPlaces();
      if (place) {
        setAddress(place.formatted_address);
      }
    }
  };

  return (
    <StandaloneSearchBox
      onLoad={(ref) => (inputRef.current = ref)}
      onPlacesChanged={handlePlaceChanged}
    >
      <TextField
        fullWidth
        required={true}
        type="search"
        placeholder="Search Address"
        label="Search Address"
        name="address"
      />
    </StandaloneSearchBox>
  );
};

export default AddressAutoComplete;
