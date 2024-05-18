import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";

const WebRouter = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/profile/:username" element={<Profile />}></Route>
      <Route path="*" element={<Navigate to="/home" />}></Route>
    </Routes>
  );
};

export default WebRouter;
