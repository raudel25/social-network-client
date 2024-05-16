import { Route, Routes, Navigate } from "react-router-dom";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";

export const AuthRouter = () => {
  return (
    <div className="auth-main">
      <Routes>
        <Route path="/register" element={<SignUp />}></Route>
        <Route path="/login" element={<SignIn />}></Route>
        <Route
          path="*"
          element={<Navigate to="/auth/login" replace></Navigate>}
        ></Route>
      </Routes>
    </div>
  );
};
