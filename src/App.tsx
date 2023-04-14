import { Route, Routes } from "react-router-dom";
import SignUp from "./routes/authentication/Authentication.component";
import Navbar from "./shared/ components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {["/sign-in", "/sign-up"].map((path, index) => (
          <Route path={path} element={<SignUp />} key={index} />
        ))}
      </Routes>
    </>
  );
};

export default App;
