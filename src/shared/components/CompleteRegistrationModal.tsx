import { Box, Modal, styled } from "@mui/material";
import { AuthEnum, CompleteRegistrationFormFieldsValues, COMPLETE_REGISTRATION_FORM_FIELDS, User } from "../../routes/authentication/types/types.auth";
import FormWrapper from "../../routes/authentication/components/AuthFormWrapper.component";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import { showErrorSnackbar } from "../../routes/authentication/utils/auth.utils";

const StyledModal = styled(Modal)`
  margin: auto;
`;

const ModalContentWrapper = styled(Box)`
  position: absolute;
  background-color: white;
  padding: 2rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

type CompleteRegistrationModalProps = {
    open: boolean;
}

const CompleteRegistrationModal = (props: CompleteRegistrationModalProps) => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const initialFormFields = {
        firstName: currentUser?.firstName || "",
        lastName: currentUser?.lastName || "",
        postCode: currentUser?.postcode || "",
    }
    const [formFields, setFormFields] = useState<CompleteRegistrationFormFieldsValues>(initialFormFields);
    
    if(!currentUser) return null;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        saveUserDetails();
    }

    const handleFormFieldChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      ) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value });
      };

    const saveUserDetails = async () => {
        const userInput: User = {
          firstName: formFields.firstName,
          lastName: formFields.lastName,
          postcode: formFields.postCode,
          email: currentUser.email,
          cognitoId: currentUser.cognitoId,
        };
        try {
          await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/users`,
            userInput,
            {
              headers: {
                Authorization: currentUser.idToken,
              },
            }
          );
          setCurrentUser({ ...currentUser, hasCompletedRegistration: true });
        } catch (error) {
          showErrorSnackbar(error.message);
        }
      };

    return (
        <StyledModal
            open={props.open}
            hideBackdrop={false}
        >
          <ModalContentWrapper>
            <FormWrapper
                title="Complete your details"
                handleSubmit={handleSubmit}
                handleFormFieldChange={handleFormFieldChange}
                formFields={COMPLETE_REGISTRATION_FORM_FIELDS}
                authType={AuthEnum.COMPLETE_REGISTRATION}
                defaultValues={formFields}
                buttonText="Submit"
            />
          </ModalContentWrapper>
        </StyledModal>
    )
};

export default CompleteRegistrationModal;
