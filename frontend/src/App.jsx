import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import RefrshHandler from "./refrshHandler.jsx";
import Home from "./sourcePages/homePage.jsx";
import AdminLogin from "./authPages/adminLogin.jsx";
import StaffLogin from "./authPages/staffLogin.jsx";
import StudentLogin from "./authPages/studentLogin.jsx";
import AdminSignup from "./authPages/adminSignup.jsx";
import StudentSignup from "./authPages/studentSignup.jsx";
import AdminPage from "./sourcePages/adminPage.jsx";
import StaffPage from "./sourcePages/staffPage.jsx";
import StudentPage from "./sourcePages/studentPage.jsx";
import AboutUs from "./homeComponents/aboutUs.jsx";
import CreatingClothes from "./staffComponents/CreatingClothes.jsx";
import ClothSubmit from "./userComponents/clothSubmit.jsx";
import TrackPage from "./sourcePages/trackPage.jsx";
import UserSetting from "./userComponents/userSetting.jsx";
import DailyReport from "./staffComponents/dailyReport.jsx";
import ExtraClothPage from "./sourcePages/extraClothPage.jsx";
import EditStaffPage from "./sourcePages/editStaffPage.jsx";
import AboutUniqueId from "./adminComponents/aboutUniqueId.jsx";

// Private route wrapper
const PrivateRoute = ({ element, isAuthenticated, allowedRole }) => {
  const userRole = localStorage.getItem("role");
  const roles = Array.isArray(allowedRole) ? allowedRole : [allowedRole];
  return isAuthenticated && roles.includes(userRole) ? (
    element
  ) : (
    <Navigate to="/home" />
  );
};

// Public route wrapper
const PublicRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? <Navigate to="/home" /> : element;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <div className="App">
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Public routes*/}
        <Route
          path="/home"
          element={
            <PublicRoute isAuthenticated={isAuthenticated} element={<Home />} />
          }
        />
        <Route
          path="/adminLogin"
          element={
            <PublicRoute
              element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />}
            />
          }
        />
        <Route
          path="/staffLogin"
          element={
            <PublicRoute
              element={<StaffLogin setIsAuthenticated={setIsAuthenticated} />}
            />
          }
        />
        <Route
          path="/studentLogin"
          element={
            <PublicRoute
              element={<StudentLogin setIsAuthenticated={setIsAuthenticated} />}
            />
          }
        />
        <Route
          path="/adminSignup"
          element={
            <PublicRoute
              isAuthenticated={isAuthenticated}
              element={<AdminSignup />}
            />
          }
        />
        <Route
          path="/studentSignup"
          element={
            <PublicRoute
              isAuthenticated={isAuthenticated}
              element={<StudentSignup />}
            />
          }
        />

        {/* Static page */}
        <Route path="/aboutUs" element={<AboutUs />} />

        {/* Administrator private routes */}
        <Route
          path="/adminPage"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              allowedRole="Administrator"
              element={<AdminPage />}
            />
          }
        />
        <Route
          path="/editStaffPage"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              allowedRole="Administrator"
              element={<EditStaffPage />}
            />
          }
        />
        <Route
          path="/aboutUniqueId"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              allowedRole="Administrator"
              element={<AboutUniqueId />}
            />
          }
        />

        {/* Staff private routes */}
        <Route
          path="/staffPage"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              allowedRole="Staff/Faculty"
              element={<StaffPage />}
            />
          }
        />
        <Route
          path="/creatingClothes"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              allowedRole="Staff/Faculty"
              element={<CreatingClothes />}
            />
          }
        />
        <Route
          path="/dailyReport"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              allowedRole="Staff/Faculty"
              element={<DailyReport />}
            />
          }
        />
        <Route
          path="/extraClothPage"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              allowedRole="Staff/Faculty"
              element={<ExtraClothPage />}
            />
          }
        />

        {/* Student/User private routes */}
        <Route
          path="/studentPage"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              allowedRole="Student/Users"
              element={<StudentPage />}
            />
          }
        />
        <Route
          path="/clothSubmit"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              allowedRole="Student/Users"
              element={<ClothSubmit />}
            />
          }
        />
        <Route
          path="/trackPage"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              allowedRole="Student/Users"
              element={<TrackPage />}
            />
          }
        />

        {/* Shared private routes */}
        <Route
          path="/userSetting"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              allowedRole={["Student/Users", "Administrator", "Staff/Faculty"]}
              element={<UserSetting />}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
