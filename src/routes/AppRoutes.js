import { Routes, Route } from "react-router-dom";
import Authentication from "../pages/authentication/Authentication";
import Admin from "../pages/Admin/Admin";
import Client from "../pages/Client/Client";
import Home from "../pages/home/Home";
const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Authentication />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/client" element={<Client />} />
      </Routes>
    </>
  );
};
export default AppRoutes;
// https://relevel-movie-booking-app-be.herokuapp.com/
