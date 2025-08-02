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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/home" />;
  };

  return (
    <div className="App">
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        {/* Redirect root to /home */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/adminSignup" element={<AdminSignup />} />
        <Route path="/studentSignup" element={<StudentSignup />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/staffLogin" element={<StaffLogin />} />
        <Route path="/studentLogin" element={<StudentLogin />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        {/* Private routes */}
        <Route
          path="/adminPage"
          element={<PrivateRoute element={<AdminPage />} />}
        />
        <Route
          path="/staffPage"
          element={<PrivateRoute element={<StaffPage />} />}
        />
        <Route
          path="/studentPage"
          element={<PrivateRoute element={<StudentPage />} />}
        />
      </Routes>
    </div>
  );
}

export default App;
