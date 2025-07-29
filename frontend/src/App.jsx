import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import RefrshHandler from "./refrshHandler.jsx";
import Login from "./authPages/Login.jsx";
import Signup from "./authPages/Signup.jsx";
import Home from "./sourcePages/homePage.jsx";
import AdminPage from "./sourcePages/adminPage.jsx";
import StaffPage from "./sourcePages/staffPage.jsx";
import StudentPage from "./sourcePages/studentPage.jsx";

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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
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
