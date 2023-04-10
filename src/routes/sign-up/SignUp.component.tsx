import { Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import styled from "styled-components";
import Button from "../../shared/ components/Button";
import FormWrapper from "./components/FormWrapper.component";

const Container = styled.div`
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SD = styled.div`
  flex-direction: column;
`;

const StyledText = styled.strong`
  font-weight: 500;
  margin: var(--spacing-sm);
`;

const StyledHeader = styled(Typography)`
  margin: auto;
  margin-bottom: var(--spacing-lg);
`;

const SignUp = () => {
  const [userType, setUserType] = useState<string | null>(null);
  const [formFields, setFormFields] = useState({});

  const handleUserTypeChange = (e: React.ChangeEvent<HTMLButtonElement>) => {
    setUserType(e.target.name);
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    await console.log(formFields);
  };

  const handleFormFieldChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };
  console.log(formFields);
  return (
    <Container>
      {userType === null && (
        <>
          <StyledHeader gutterBottom align="center" variant="h3">
            Please select your role
          </StyledHeader>
          <Button
            variant="outlined"
            label="User"
            type="button"
            name="user"
            onClick={handleUserTypeChange}
          />
          <StyledText>OR</StyledText>
          <Button
            variant="outlined"
            label="Practitoner"
            name="practitoner"
            type="button"
            onClick={handleUserTypeChange}
          />
        </>
      )}
      {userType !== null && (
        <FormWrapper
          handleFormFieldChange={handleFormFieldChange}
          userType={userType}
          setUserType={setUserType}
        />
      )}
    </Container>
  );
};

export default SignUp;
