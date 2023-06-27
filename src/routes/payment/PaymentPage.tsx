import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import LoadingProgress from "../../shared/components/LoadingProgress";
import NotFoundCard from "../../shared/components/StaticTextCard";
import CustomSnackbar, {
  SnackBarConfig,
} from "../../shared/components/Snackbar";
import { UserContext } from "../../shared/contexts/UserContext";
import { H2 } from "../../shared/styles";
import { showErrorSnackbar } from "../authentication/utils/auth.utils";
import NavCard from "../welcome/components/NavCard";
import { NAV_CARD_DATA } from "../welcome/types/welcome.types";
import { NavCardWrapper } from "../welcome/WelcomePage";
import CheckoutForm from "./components/CheckoutForm";

type PaymentPageProps = {
  stripePromise: any;
};

const CardWrapper = styled.div`
  margin: var(--spacing-md);
`;

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
  const [snackbarConfig, setSnackbarConfig] = useState<SnackBarConfig>();
  const [loading, setLoading] = useState(false);

  const { currentUser } = useContext(UserContext);

  const handleSnackBarClose = () => {
    setSnackbarConfig({ ...snackbarConfig, open: false });
  };

  const createPaymentIntent = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/payment/create-payment-intent`,
        {},
        {
          headers: {
            Authorization: currentUser?.idToken,
          },
        }
      );
      setClientSecret(res.data);
    } catch (error) {
      setSnackbarConfig(showErrorSnackbar(error.message));
    }
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

      {!currentUser?.isMember && clientSecret && stripePromise ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      ) : (
        <CardWrapper>
          <NotFoundCard
            title="Thanks!"
            text="It seems that you are already a member!"
          />
        </CardWrapper>
      )}
      <NavCardWrapper>
        {NAV_CARD_DATA.map((navCardData) => {
          return <NavCard key={navCardData.title} navCardData={navCardData} />;
        })}
      </NavCardWrapper>
      <CustomSnackbar config={snackbarConfig} setOpen={handleSnackBarClose} />
    </>
  );
};

export default PaymentPage;
