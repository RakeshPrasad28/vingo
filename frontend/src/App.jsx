import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import ForgotPassword from "./pages/ForgotPassword";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import useGetCity from "./hooks/useGetCity";

export const serverURL = "http://localhost:8000";
const App = () => {
  useGetCurrentUser();
  useGetCity();
  const { userData } = useSelector((state) => state.user);
  return (
    <Routes>
      <Route
        path="signup"
        element={!userData ? <Signup /> : <Navigate to={"/"} />}
      />
      <Route
        path="signin"
        element={!userData ? <Signin /> : <Navigate to={"/"} />}
      />
      <Route
        path="forgot-password"
        element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />}
      />
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to={"/signin"} />}
      />
    </Routes>
  );
};

export default App;
