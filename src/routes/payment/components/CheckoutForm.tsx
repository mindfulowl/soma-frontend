import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import styled from "styled-components";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@mui/material";
import { showErrorSnackbar } from "../../authentication/utils/auth.utils";
import CustomSnackbar, {
  SnackBarConfig,
} from "../../../shared/components/Snackbar";

const StyledCheckoutButton = styled(Button)`
  margin-top: var(--spacing-md);
`;

const Container = styled.div`
  padding: var(--spacing-md);
`;

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [snackbarConfig, setSnackbarConfig] = useState<SnackBarConfig>();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSnackBarClose = () => {
    setSnackbarConfig({ ...snackbarConfig, open: false });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/membership`,
      },
    });

    if (error) {
      setSnackbarConfig(
        showErrorSnackbar("An account with the given email already exists")
      );
      return;
    }

    setIsProcessing(false);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <StyledCheckoutButton
          disabled={isProcessing || !stripe || !elements}
          variant="outlined"
          type="submit"
        >
          <span>{isProcessing ? "Processing ... " : "Pay now"}</span>
        </StyledCheckoutButton>
        <CustomSnackbar config={snackbarConfig} setOpen={handleSnackBarClose} />
      </form>
    </Container>
  );
};
export default CheckoutForm;
