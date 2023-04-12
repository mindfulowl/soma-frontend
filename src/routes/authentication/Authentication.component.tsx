import { useState } from "react";
import FormWrapper from "./components/FormWrapper.component";
import { Container } from "../../shared/ components/Container";
import { useLocation } from "react-router-dom";

const Authentication = () => {
  const [formFields, setFormFields] = useState({});
  const location = useLocation();

  let authType = location.pathname.includes("sign-in") ? "sign-in" : "sign-up";

  const handleFormFieldChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <Container>
      <FormWrapper
        handleFormFieldChange={handleFormFieldChange}
        authType={authType}
      />
    </Container>
  );
};

export default Authentication;
