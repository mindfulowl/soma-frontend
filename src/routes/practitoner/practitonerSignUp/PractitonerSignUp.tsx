import { Typography, Box, Grid, Button, TextField } from "@mui/material";
import { useState } from "react";
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
import AddressAutocomplete from "mui-address-autocomplete";
import Autocomplete from "react-google-autocomplete";
import Select from "../../../shared/components/Select";
import ReactGoogleMapLoader from "react-google-maps-loader";
import { StyledLink } from "../../../shared/components/Link";
import {
  StyledAvatarWrapper,
  StyledFormContainer,
} from "../../../shared/styles/formStyles/FormStyles";

const ButtonContainer = styled.div`
  text-align: center;
`;

const FormWrapper = styled(Box)`
  width: 50%;
`;

const StyledButton = styled(Button)`
  margin-bottom: var(--spacing-md);
`;

const StyledSubtitleText = styled(Typography)`
  text-align: center;
  padding: var(--spacing-md);
`;

const defaultFormFields = {
  consultationType: "",
  email: "",
  phoneNumber: "",
  discipline: "",
  profile: "",
};

const PractitonerSignUp = () => {
  const [formFields, setFormFields] = useState<Practitoner>(defaultFormFields);
  const [practitonerHealthConcerns, setPractitonerHealthConcerns] =
    useState<Array<MultiSelectOption> | null>(null);

  const handleFormFieldChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const practitonerInput = {
      ...formFields,
      healthConcerns: practitonerHealthConcerns,
    };
    console.log(practitonerInput);
  };

  return (
    <StyledFormContainer>
      <StyledAvatarWrapper>
        <LocalPharmacyIcon />
      </StyledAvatarWrapper>

      <Typography component="h1" variant="h4" gutterBottom>
        Practitoner Sign Up
      </Typography>
      <StyledSubtitleText variant="body1">
        Upon signing up, users will be able to search for your profile on our
        <StyledLink to="/search-practitoners">Practitoners Page</StyledLink>
      </StyledSubtitleText>
      <FormWrapper
        component="form"
        onSubmit={(e: any) => handleSubmit(e)}
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
            {/* <Grid item sm={6}>
                <Autocomplete
                  style={{ width: "90%" }}
                  apiKey="AIzaSyDHBu3VTeDK82DVgZNa3GilRGSTBMlQzWE"
                  id="map"
                  onPlaceSelected={(place: any) => {
                    console.log(place);
                  }}
                  options={{
                    types: ["(places)"],
                    componentRestrictions: { country: "ru" },
                  }}
                  defaultValue="Amsterdam"
                />
              </Grid> */}
          </Grid>
        </Grid>
        <ButtonContainer>
          <StyledButton type="submit" variant="outlined" sx={{ mt: 2 }}>
            Register as a Practitoner
          </StyledButton>
        </ButtonContainer>
      </FormWrapper>
    </StyledFormContainer>
  );
};
export default PractitonerSignUp;
