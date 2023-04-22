import { Route, Routes } from "react-router-dom";
import SignUp from "./routes/authentication/Authentication.component";
import WelcomePage from "./routes/welcome/WelcomePage";
import Navbar from "./shared/components/Navbar";
import NotFoundPage from "./shared/components/NotFoundPage";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {["/sign-in", "/sign-up", "/verification"].map((path, index) => (
          <Route path={path} element={<SignUp />} key={index} />
        ))}
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
