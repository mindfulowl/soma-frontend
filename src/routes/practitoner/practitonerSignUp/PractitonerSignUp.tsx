import { Container, Typography, Box, Grid, Button } from "@mui/material";
import { useState } from "react";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import styled from "styled-components";
import MultiSelect from "../../../shared/ components/MultiSelect";
import {
  PRACTITONER_DISCIPLINE_OPTIONS,
  PRACTITONER_HEALTH_CONCERNS_OPTIONS,
} from "../types/practitoner.types";
import AddressAutocomplete from "mui-address-autocomplete";
import Autocomplete from "react-google-autocomplete";
import Select from "../../../shared/ components/Select";
import ReactGoogleMapLoader from "react-google-maps-loader";

const StyledBox = styled(Box)`
  margin-top: var(--spacing-xs);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledIcon = styled(LocalPharmacyIcon)`
  font-size: var(--icon-size-large);
  margin: var(--spacing-md) 0;
`;

const StyledButton = styled(Button)`
  margin-bottom: var(--spacing-md);
`;

const PractitonerSignUp = () => {
  <ReactGoogleMapLoader
    params={{
      key: "AIzaSyDHBu3VTeDK82DVgZNa3GilRGSTBMlQzWE", // Define your api key here
      libraries: "places,geometry,maps", // To request multiple libraries, separate them with a comma
    }}
    render={(googleMaps, error) =>
      googleMaps ? (
        <div>
          {/*Show a custom error if SDK Authentication Error. See N/B 2 below.*/}
          {error ? error : "Google Maps is loaded !"}
        </div>
      ) : (
        <div>
          {/*Check for network error so loading state ends if user lost connection.*/}
          {error === "Network Error" ? <p>{error}</p> : <p>isLoading...</p>}
        </div>
      )
    }
  />;
  const [formFields, setFormFields] = useState();
  const [value, setValue] = useState<any>();

  const handleSubmit = () => console.log(formFields);
  return (
    <Container component="main" maxWidth="xs">
      <StyledBox>
        <StyledIcon />

        <Typography component="h1" variant="h4">
          Practitoner Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Select
                options={PRACTITONER_DISCIPLINE_OPTIONS}
                label="Discipline"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MultiSelect
                options={PRACTITONER_HEALTH_CONCERNS_OPTIONS}
                label="Offered Health Concerns"
              />
              <Grid item sm={6}>
                <Autocomplete
                  style={{ width: "90%" }}
                  apiKey="AIzaSyDxstnN3THTMwJ9PBa62XpQTyiRLDmDxg8"
                  onPlaceSelected={(place: any) => {
                    console.log(place);
                  }}
                  options={{
                    types: ["(places)"],
                    componentRestrictions: { country: "ru" },
                  }}
                  defaultValue="Amsterdam"
                />
              </Grid>
            </Grid>
          </Grid>
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
          >
            Register as a Practitoner
          </StyledButton>
        </Box>
      </StyledBox>
    </Container>
  );
};
export default PractitonerSignUp;
