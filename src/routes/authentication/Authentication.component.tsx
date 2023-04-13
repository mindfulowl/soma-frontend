import { useEffect, useState } from "react";
import FormWrapper from "./components/FormWrapper.component";
import { Container } from "../../shared/ components/Container";
import { useLocation } from "react-router-dom";
import axios from "axios";

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

  const getTest = async () => {
    const res = await axios.get(
      "http://ec2-13-40-183-104.eu-west-2.compute.amazonaws.com/products"
    );
    console.log("r", res);
  };

  useEffect(() => {
    getTest();
  }, []);

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
