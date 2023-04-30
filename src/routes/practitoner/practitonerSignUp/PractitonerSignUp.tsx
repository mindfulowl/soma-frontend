import { useContext, useState } from "react";
import { Box, Grid, TextField } from "@mui/material";
import axios from "axios";
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
import { H2, P } from "../../../shared/styles";
import AddressAutoComplete from "../components/AddressAutoComplete";
import ImageUpload from "../../../shared/components/ImageUpload";
import CustomSnackbar, {
  SnackBarConfig,
} from "../../../shared/components/Snackbar";
import { showErrorSnackbar } from "../../authentication/utils/auth.utils";
import { UserContext } from "../../../shared/contexts/UserContext";

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

const defaultFormFields = {
  consultationType: "",
  email: "",
  phoneNumber: "",
  discipline: "",
  profile: "",
};

const PractitonerSignUp = () => {
  const [formFields, setFormFields] = useState<Practitoner>(defaultFormFields);
  const [address, setAddress] = useState("");
  const [fileData, setFileData] = useState<File | null>(null);
  const [snackbarConfig, setSnackbarConfig] = useState<SnackBarConfig>();
  const [practitonerHealthConcerns, setPractitonerHealthConcerns] =
    useState<Array<MultiSelectOption> | null>(null);

  const { currentUser } = useContext(UserContext);

  const handleSnackBarClose = () => {
    setSnackbarConfig({ ...snackbarConfig, open: false });
  };

  const setFile = (file: File) => {
    setFileData(file);
  };

  const resetFile = () => {
    setFileData(null);
  };

  const s3ImageUpload = async () => {
    try {
      if (fileData) {
        await axios.put(
          `https://wpbfcj8sze.execute-api.eu-west-2.amazonaws.com/prod/soma-ui-images/${formFields.email}.jpeg`,
          fileData,
          {
            headers: {
              Authorization: `${currentUser?.idToken}`,
            },
          }
        );
      }
    } catch (error) {
      setSnackbarConfig(showErrorSnackbar(error.message));
    }
  };

  const handleFormFieldChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    s3ImageUpload();
    const practitonerInput: Practitoner = {
      ...formFields,
      healthConcerns: practitonerHealthConcerns || [],
    };
    console.log(practitonerInput);
  };

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
            <MultiSelect
              options={PRACTITONER_HEALTH_CONCERNS_OPTIONS}
              currentValue={practitonerHealthConcerns || null}
              handleChange={setPractitonerHealthConcerns}
              label="Offered Health Concerns"
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
            <AddressAutoComplete
              setAddress={setAddress}
              addressValue={address}
            />
          </Grid>
          <Grid item xs={12}>
            <ImageUpload
              onFileChange={setFile}
              state={fileData !== null ? "uploaded" : "upload"}
              onReset={resetFile}
            />
          </Grid>
        </Grid>
        <ButtonContainer>
          <StyledFormButton type="submit" variant="outlined" sx={{ mt: 2 }}>
            Register as a Practitoner
          </StyledFormButton>
        </ButtonContainer>
      </FormWrapper>
      <CustomSnackbar config={snackbarConfig} setOpen={handleSnackBarClose} />
    </StyledFormContainer>
  );
};

export default PractitonerSignUp;
