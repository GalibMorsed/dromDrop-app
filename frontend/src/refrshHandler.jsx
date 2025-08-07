import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RefrshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      setIsAuthenticated(true);

      const publicPaths = [
        "/",
        "/home",
        "/adminLogin",
        "/staffLogin",
        "/studentLogin",
        "/adminSignup",
        "/studentSignup",
      ];

      if (publicPaths.includes(location.pathname)) {
        if (role === "admin") {
          navigate("/adminPage", { replace: true });
        } else if (role === "staff") {
          navigate("/staffPage", { replace: true });
        } else if (role === "student/user") {
          navigate("/studentPage", { replace: true });
        }
      }
    } else {
      setIsAuthenticated(false);
      const privatePaths = ["/adminPage", "/staffPage", "/studentPage"];
      if (privatePaths.includes(location.pathname)) {
        navigate("/home", { replace: true });
      }
    }
  }, [location.pathname, navigate, setIsAuthenticated]);

  return null;
}

export default RefrshHandler;
