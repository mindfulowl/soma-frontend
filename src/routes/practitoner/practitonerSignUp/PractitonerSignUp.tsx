import { Typography, Box, Grid, TextField } from "@mui/material";
import { useContext, useRef, useState } from "react";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import styled from "styled-components";
import MultiSelect, {
  MultiSelectOption,
} from "../../../shared/components/MultiSelect";
import {
  Practitoner,
  PRACTITONER_CONSULATION_TYPE_OPTIONS,
  PRACTITONER_DISCIPLINE_OPTIONS,
  PRACTITONER_HEALTH_CONCERNS_OPTIONS,
  PRACTITONER_SIGN_UP_TEXTFIELDS,
} from "../types/practitoner.types";

import Select from "../../../shared/components/Select";
import { StyledLink } from "../../../shared/components/Link";
import {
  StyledAvatarWrapper,
  StyledFormContainer,
  StyledFormButton,
} from "../../../shared/styles/formStyles/FormStyles";
import { H2, H4, P } from "../../../shared/styles";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { UserContext } from "../../../shared/contexts/UserContext";

const GOOGLE_LIBS = ["places"];

const ButtonContainer = styled.div`
  text-align: center;
`;

const FormWrapper = styled(Box)`
  width: 50%;
`;

const StyledSubtitleText = styled(P)`
  text-align: center;
  padding: var(--spacing-md);
`;
const StyledInput = styled.input`
  width: 300px;
`;

const defaultFormFields = {
  consultationType: "",
  email: "",
  phoneNumber: "",
  discipline: "",
  profile: "",
};

const PractitonerSignUp = () => {
  const inputRef = useRef();
  const [formFields, setFormFields] = useState<Practitoner>(defaultFormFields);
  const [practitonerHealthConcerns, setPractitonerHealthConcerns] =
    useState<Array<MultiSelectOption> | null>(null);

  const [address, setAddress] = useState("");

  const handleChange = (value: any) => {
    setAddress(value);
  };

  const handleSelect = (value: any) => {
    setAddress(value);
  };

  // <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC-LN7kt1pQYLVvnKEecf-wjaAvUDqyrC8&libraries=places"></script>

  const handleFormFieldChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    const practitonerInput: Practitoner = {
      ...formFields,
      healthConcerns: practitonerHealthConcerns || [],
    };
    console.log(practitonerInput);
  };

  const handlePlaceChanged = () => {
    //@ts-ignore
    const [place] = inputRef?.current.getPlaces();
    if (place) console.log(place);
  };

  const { currentUser } = useContext(UserContext);

  console.log(currentUser);

  return (
    <StyledFormContainer>
      <StyledAvatarWrapper>
        <LocalPharmacyIcon />
      </StyledAvatarWrapper>

      <H2>Practitoner Sign Up</H2>
      <StyledSubtitleText>
        Upon signing up, users will be able to search for your profile on our
        <StyledLink to="/search-practitoners">Practitoners Page</StyledLink>
      </StyledSubtitleText>
      <FormWrapper
        component="form"
        onSubmit={(e: React.FormEvent<HTMLDivElement>) => handleSubmit(e)}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          {PRACTITONER_SIGN_UP_TEXTFIELDS.map((field) => {
            return (
              <Grid item xs={field.xs} sm={field.sm} key={field.name}>
                <TextField
                  name={field.name}
                  label={field.label}
                  type={field.type}
                  required
                  fullWidth
                  onChange={handleFormFieldChange}
                />
              </Grid>
            );
          })}
          <Grid item xs={12} sm={6}>
            <MultiSelect
              options={PRACTITONER_HEALTH_CONCERNS_OPTIONS}
              currentValue={practitonerHealthConcerns || null}
              handleChange={setPractitonerHealthConcerns}
              label="Offered Health Concerns"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              options={PRACTITONER_CONSULATION_TYPE_OPTIONS}
              currentValue={formFields.consultationType}
              onChange={handleFormFieldChange}
              name="consultationType"
              label="Consultation Type"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              options={PRACTITONER_DISCIPLINE_OPTIONS}
              onChange={handleFormFieldChange}
              currentValue={formFields.discipline}
              name="discipline"
              label="Discipline"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Profile"
              fullWidth
              onChange={handleFormFieldChange}
              name="profile"
              required
              placeholder="Summarise the services, or products, you specalise in"
              multiline
            />
          </Grid>
          <Grid item xs={12}>
            {" "}
            <StandaloneSearchBox
              /* @ts-ignore */
              onLoad={(ref) => (inputRef.current = ref)}
              onPlacesChanged={handlePlaceChanged}
            >
              <TextField
                fullWidth
                type="search"
                placeholder="Search Address"
              ></TextField>
            </StandaloneSearchBox>
          </Grid>
        </Grid>
        <ButtonContainer>
          <StyledFormButton type="submit" variant="outlined" sx={{ mt: 2 }}>
            Register as a Practitoner
          </StyledFormButton>
        </ButtonContainer>
      </FormWrapper>
    </StyledFormContainer>
  );
};

export default PractitonerSignUp;
