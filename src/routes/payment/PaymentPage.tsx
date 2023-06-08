import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import LoadingProgress from "../../shared/components/LoadingProgress";
import { UserContext } from "../../shared/contexts/UserContext";
import { H2 } from "../../shared/styles";
import NavCard from "../welcome/components/NavCard";
import { NAV_CARD_DATA } from "../welcome/types/welcome.types";
import { NavCardWrapper } from "../welcome/WelcomePage";
import CheckoutForm from "./components/CheckoutForm";

type PaymentPageProps = {
  stripePromise: any;
};

const HeaderWrapper = styled.div`
  align-items: center;
`;

const StyledHeader = styled(H2)`
  margin: auto;
  margin-top: var(--spacing-md);
  text-align: center;
  text-decoration: underline;
`;

const PaymentPage = (props: PaymentPageProps) => {
  const { stripePromise } = props;
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentUser } = useContext(UserContext);

  const createPaymentIntent = async () => {
    const res = await axios.post(
      `http://localhost:5252/payment/create-payment-intent`,
      {},
      {
        headers: {
          Authorization: currentUser?.idToken,
        },
      }
    );
    setClientSecret(res.data);
  };

  useEffect(() => {
    if (!currentUser?.idToken) return;
    setLoading(true);
    createPaymentIntent();
    setLoading(false);
  }, [currentUser?.idToken]);

  if (loading || !clientSecret) {
    return <LoadingProgress />;
  }

  return (
    <>
      <HeaderWrapper>
        <StyledHeader>Become a Member</StyledHeader>
      </HeaderWrapper>

      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
      <NavCardWrapper>
        {NAV_CARD_DATA.map((navCardData) => {
          return <NavCard key={navCardData.title} navCardData={navCardData} />;
        })}
      </NavCardWrapper>
    </>
  );
};

export default PaymentPage;
