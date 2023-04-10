import { Route, Routes } from "react-router-dom";
import SignUp from "./routes/sign-up/SignUp.component";
import Navbar from "./shared/ components/Nabar";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="/sign-up" element={<SignUp />} />
      </Route>
    </Routes>
  );
};

export default App;
