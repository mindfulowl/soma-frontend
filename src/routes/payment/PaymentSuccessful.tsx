import styled from "styled-components";
import { H2 } from "../../shared/styles";
import StaticTextCard from "../../shared/components/StaticTextCard";
import { NavCardWrapper } from "../welcome/WelcomePage";
import { NAV_CARD_DATA } from "../welcome/types/welcome.types";
import NavCard from "../welcome/components/NavCard";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../shared/contexts/UserContext";
import CustomSnackbar, { SnackBarConfig } from "../../shared/components/Snackbar";

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

export const PaymentSuccessful = () => {
    const { currentUser } = useContext(UserContext);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const paymentIntentId = searchParams.get('payment_intent');

    const [snackbarConfig, setSnackbarConfig] = useState<SnackBarConfig>();
    const handleSnackBarClose = () => {
        setSnackbarConfig({ ...snackbarConfig, open: false });
      };

    useEffect(() => {
        axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/payment/confirm`,
            {
                paymentIntentId,
            },
            {
                headers: {
                Authorization: currentUser?.idToken,
                },
            }
        );
    }, [currentUser?.idToken, paymentIntentId]);

    return (
        <>
            <HeaderWrapper>
                <StyledHeader>Payment Successful</StyledHeader>
            </HeaderWrapper>
            <CardWrapper>
                <StaticTextCard
                    title="Thanks!"
                    text="You are now a member!"
                />
            </CardWrapper>
            <NavCardWrapper>
                {NAV_CARD_DATA.map((navCardData) => {
                    return <NavCard key={navCardData.title} navCardData={navCardData} />;
                })}
            </NavCardWrapper>
            <CustomSnackbar config={snackbarConfig} setOpen={handleSnackBarClose} />
        </>
    );
};
