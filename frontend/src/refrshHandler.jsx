import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RefreshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const publicPaths = [
      "/",
      "/home",
      "/adminLogin",
      "/staffLogin",
      "/studentLogin",
      "/adminSignup",
      "/studentSignup",
    ];

    const privatePaths = ["/adminPage", "/staffPage", "/studentPage"];

    if (token && role) {
      setIsAuthenticated(true);

      if (publicPaths.includes(location.pathname)) {
        if (role === "Administrator") {
          navigate("/adminPage", { replace: true });
        } else if (role === "Staff/Faculty") {
          navigate("/staffPage", { replace: true });
        } else if (role === "Student/Users") {
          navigate("/studentPage", { replace: true });
        }
      }
    } else {
      setIsAuthenticated(false);

      if (privatePaths.includes(location.pathname)) {
        navigate("/", { replace: true });
      }
    }
  }, [location.key]);

  return null;
}

export default RefreshHandler;
