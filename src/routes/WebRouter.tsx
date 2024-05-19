import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/home/Home";
import ProfilePage from "../pages/profile/Profile";

const WebRouter = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />}></Route>
      <Route path="/profile/:username" element={<ProfilePage />}></Route>
      <Route path="*" element={<Navigate to="/home" />}></Route>
    </Routes>
  );
};

export default WebRouter;
