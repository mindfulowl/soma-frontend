import { Route, Routes } from "react-router-dom";
import SignUp from "./routes/sign-up/SignUp.component";
import Navbar from "./shared/ components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default App;
