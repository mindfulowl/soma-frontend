import { Route, Routes } from "react-router-dom";
import SignUp from "./routes/authentication/Authentication.component";
import WelcomePage from "./routes/welcome/WelcomePage";
import Navbar from "./shared/components/Navbar";
import NotFoundPage from "./shared/components/NotFoundPage";
import CompleteRegistrationModal from "./shared/components/CompleteRegistrationModal";
import { useContext } from "react";
import { UserContext } from "./shared/contexts/UserContext";
import PractitionerSignUp from "./routes/practitoner/practitonerSignUp/PractitionerSignUp";
import NewsPage from "./routes/news/NewsPage";
import ProductsPage from "./routes/products/ProductsPage";
import PractitionerSearch from "./routes/practitoner/practitionerSearch/PractitionerSearch";
import PaymentPage from "./routes/payment/PaymentPage";
import BrandsPage from "./routes/brands/BrandsPage";
import ForgotPassword from "./routes/authentication/components/ForgotPassword";
import Footer from "./shared/components/Footer";
import { Container } from "./shared/components/Container";
import { PaymentSuccessful } from "./routes/payment/PaymentSuccessful";

const App = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <>
      <Navbar />
      <CompleteRegistrationModal
        open={currentUser?.hasCompletedRegistration === false}
      />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        {["/sign-in", "/sign-up", "/verification"].map((path, index) => (
          <Route path={path} element={<SignUp />} key={index} />
        ))}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/practitioner-sign-up" element={<PractitionerSignUp />} />
        <Route path="/practitioner-search" element={<PractitionerSearch />} />
        <Route path="/membership" element={<PaymentPage />} />
        <Route path="/payment-successful" element={<PaymentSuccessful />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <Container>
        <Footer />
      </Container>
    </>
  );
};

export default App;
