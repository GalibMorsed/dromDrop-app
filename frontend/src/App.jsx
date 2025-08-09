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

// Private route wrapper
const PrivateRoute = ({ element, isAuthenticated, allowedRole }) => {
  const userRole = localStorage.getItem("role");
  return isAuthenticated && userRole === allowedRole ? (
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

        {/* Private routes*/}
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
          path="/staffPage"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              allowedRole="Faculty"
              element={<StaffPage />}
            />
          }
        />
        <Route
          path="/studentPage"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              allowedRole="Students"
              element={<StudentPage />}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
