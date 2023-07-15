import { useContext, useEffect, useState } from "react";
import { Box, Grid, TextField } from "@mui/material";
import axios from "axios";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import styled from "styled-components";
import MultiSelect, {
  MultiSelectOption,
} from "../../../shared/components/MultiSelect";
import {
  Practitioner,
  practitioner_CONSULATION_TYPE_OPTIONS,
  practitioner_DISCIPLINE_OPTIONS,
  practitioner_HEALTH_CONCERNS_OPTIONS,
  practitioner_INSTITUTE_OPTIONS,
  practitioner_SIGN_UP_TEXTFIELDS,
} from "../types/practitioner.types";

import Select from "../../../shared/components/Select";
import { StyledLink } from "../../../shared/components/Link";
import {
  StyledAvatarWrapper,
  StyledFormContainer,
  StyledFormButton,
} from "../../../shared/styles/formStyles/FormStyles";
import { H2, P } from "../../../shared/styles";
import AddressAutoComplete from "../components/AddressAutoComplete";
import ImageUpload, {
  UploadEnum,
} from "../../../shared/components/ImageUpload";
import CustomSnackbar, {
  SnackBarConfig,
} from "../../../shared/components/Snackbar";
import { showErrorSnackbar } from "../../authentication/utils/auth.utils";
import { UserContext } from "../../../shared/contexts/UserContext";
import LoadingProgress from "../../../shared/components/LoadingProgress";

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
  consultation: "",
  email: "",
  phoneNumber: "",
  profile: "",
  university: "",
  url: "",
  registeringBody: "",
};

const PractitionerSignUp = () => {
  const [currentPractitioner, setCurrentPractitioner] =
    useState<Practitioner>();
  const [loading, setLoading] = useState(false);
  const [formFields, setFormFields] = useState<Practitioner>(defaultFormFields);
  const [address, setAddress] = useState("");
  const [fileData, setFileData] = useState<File | null>(null);
  const [snackbarConfig, setSnackbarConfig] = useState<SnackBarConfig>();
  const [imageRef, setImageRef] = useState();
  const [practitionerHealthConcerns, setpractitionerHealthConcerns] =
    useState<Array<MultiSelectOption> | null>(null);
  const [practitionerDisciplines, setpractitionerDisciplines] =
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
      const response = await axios({
        method: "GET",
        url: "https://npeg772hh6.execute-api.eu-west-2.amazonaws.com/default/upload-prac-images",
      });
      setImageRef(response.data.Key);
      setTimeout(() => console.log("sad", 1000));
      await axios.put(response.data.uploadURL, fileData);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleFormFieldChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const updatePractitioner = async () => {
    await s3ImageUpload();
    const practitionerUpdateInput = {
      id: currentPractitioner?.id,
      email: formFields.email || currentPractitioner?.email,
      phoneNumber: formFields.phoneNumber || currentPractitioner?.phoneNumber,
      profile: formFields.profile || currentPractitioner?.profile,
      university: formFields.university || currentPractitioner?.university,
      url: formFields.url || currentPractitioner?.url,
      consultation:
        formFields.consultation || currentPractitioner?.consultation,
      registeringBody:
        formFields.registeringBody || currentPractitioner?.registeringBody,
      imageReference: imageRef || currentPractitioner?.imageReference,
      healthConcerns:
        practitionerHealthConcerns?.map((option) => {
          return option.name;
        }) || currentPractitioner?.healthConcerns,
      disciplines:
        practitionerDisciplines?.map((option) => {
          return option.name;
        }) || currentPractitioner?.disciplines,
      userId: currentUser?.id,
      googlePlaceId: address,
    };
    await axios.put(
      `${process.env.REACT_APP_API_BASE_URL}/practitioners`,
      practitionerUpdateInput,
      {
        headers: {
          Authorization: currentUser?.idToken,
        },
      }
    );

    setSnackbarConfig({
      message: "You have succesfully updated your details!",
      type: "success",
      open: true,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (currentPractitioner) {
      try {
        updatePractitioner();
        return;
      } catch (error) {
        setSnackbarConfig(showErrorSnackbar(error.message));
        return;
      }
    }
    try {
      await s3ImageUpload();
      const practitionerSignUpInput = {
        ...formFields,
        imageReference: imageRef,
        healthConcerns: practitionerHealthConcerns?.map((option) => {
          return option.name;
        }),
        disciplines: practitionerDisciplines?.map((option) => {
          return option.name;
        }),
        userId: currentUser?.id,
        googlePlaceId: address,
      };

      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/practitioners`,
        practitionerSignUpInput,
        {
          headers: {
            Authorization: currentUser?.idToken,
          },
        }
      );
      setSnackbarConfig({
        message: "You have succesfully registered as a practitioner!",
        type: "success",
        open: true,
      });
    } catch (error) {
      setSnackbarConfig(showErrorSnackbar(error.message));
    }
  };

  const getPractitioner = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/practitioners/${currentUser?.id}`,
        {
          headers: {
            Authorization: currentUser?.idToken,
          },
        }
      );
      setCurrentPractitioner(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPractitioner();
  }, [currentUser?.idToken]);

  if (loading) {
    return <LoadingProgress />;
  }

  return (
    <StyledFormContainer>
      <StyledAvatarWrapper>
        <LocalPharmacyIcon />
      </StyledAvatarWrapper>

      <H2>
        {currentPractitioner
          ? "Update Practitioner Details"
          : "Practitioner Sign Up"}
      </H2>
      <StyledSubtitleText>
        Upon signing up, users will be able to search for your profile on our
        <StyledLink to="/practitioner-search"> Practitioners Page</StyledLink>
      </StyledSubtitleText>
      <FormWrapper
        component="form"
        onSubmit={(e: React.FormEvent<HTMLDivElement>) => handleSubmit(e)}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          {practitioner_SIGN_UP_TEXTFIELDS.map((field) => {
            return (
              <Grid item xs={field.xs} sm={field.sm} key={field.name}>
                <TextField
                  name={field.name}
                  label={field.label}
                  type={field.type}
                  required
                  defaultValue={
                    currentPractitioner &&
                    currentPractitioner[field.name as keyof Practitioner]
                  }
                  fullWidth
                  onChange={handleFormFieldChange}
                />
              </Grid>
            );
          })}
          <Grid item xs={12} sm={6}>
            <Select
              options={practitioner_CONSULATION_TYPE_OPTIONS}
              currentValue={
                currentPractitioner?.consultation || formFields.consultation
              }
              onChange={handleFormFieldChange}
              name="consultation"
              label="Consultation Type"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MultiSelect
              options={practitioner_DISCIPLINE_OPTIONS}
              handleChange={setpractitionerDisciplines}
              currentValue={
                currentPractitioner?.disciplines?.map((option) => {
                  return { name: option } as unknown as MultiSelectOption;
                }) || practitionerDisciplines
              }
              label="Discipline"
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              options={practitioner_INSTITUTE_OPTIONS}
              onChange={handleFormFieldChange}
              currentValue={
                currentPractitioner?.registeringBody ||
                formFields.registeringBody
              }
              name="registeringBody"
              label="Registering Body"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <MultiSelect
              required={false}
              options={practitioner_HEALTH_CONCERNS_OPTIONS}
              currentValue={
                (currentPractitioner &&
                  currentPractitioner.healthConcerns?.map((option) => {
                    return { name: option } as unknown as MultiSelectOption;
                  })) ||
                practitionerHealthConcerns
              }
              handleChange={setpractitionerHealthConcerns}
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
              defaultValue={currentPractitioner?.profile}
            />
          </Grid>
          <Grid item xs={12}>
            <AddressAutoComplete setAddress={setAddress} />
          </Grid>
          <Grid item xs={12}>
            <ImageUpload
              onFileChange={setFile}
              state={
                fileData !== null ? UploadEnum.UPLOADED : UploadEnum.UPLOAD
              }
              onReset={resetFile}
            />
          </Grid>
        </Grid>
        <ButtonContainer>
          <StyledFormButton type="submit" variant="outlined" sx={{ mt: 2 }}>
            {currentPractitioner
              ? "Update Details"
              : "Register as a practitioner"}
          </StyledFormButton>
        </ButtonContainer>
      </FormWrapper>
      <CustomSnackbar config={snackbarConfig} setOpen={handleSnackBarClose} />
    </StyledFormContainer>
  );
};

export default PractitionerSignUp;
