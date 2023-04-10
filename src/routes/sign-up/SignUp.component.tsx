import { useState } from "react";
import styled from "styled-components";
import FormWrapper from "./components/FormWrapper.component";

const Container = styled.div`
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignUp = () => {
  const [formFields, setFormFields] = useState({});

  const handleFormFieldChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <Container>
      <FormWrapper handleFormFieldChange={handleFormFieldChange} />
    </Container>
  );
};

export default SignUp;
