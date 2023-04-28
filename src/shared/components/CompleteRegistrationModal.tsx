import { Box, Button, Modal, styled } from "@mui/material";
import { AuthEnum, CompleteRegistrationFormFieldsValues, COMPLETE_REGISTRATION_FORM_FIELDS, User, UserPoolData } from "../../routes/authentication/types/types.auth";
import FormWrapper from "../../routes/authentication/components/AuthFormWrapper.component";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import { showErrorSnackbar } from "../../routes/authentication/utils/auth.utils";
import { CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js";

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
  text-align: center;
`;

const SignOutButton = styled(Button)`
  color: var(--color-grey-dark);
`;

type CompleteRegistrationModalProps = {
    open: boolean;
}

const CompleteRegistrationModal = (props: CompleteRegistrationModalProps) => {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const user =
      currentUser &&
      new CognitoUser({
        Username: currentUser?.email || "",
        Pool: new CognitoUserPool(UserPoolData),
      });
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

      const signOut = () => {
        user?.signOut();
        setCurrentUser(null);
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
            <SignOutButton onClick={signOut}>Sign out</SignOutButton>
          </ModalContentWrapper>
        </StyledModal>
    )
};

export default CompleteRegistrationModal;
