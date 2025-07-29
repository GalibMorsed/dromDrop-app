import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RefrshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
      const role = localStorage.getItem("role");
      if (
        location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/signup"
      ) {
        if (role === "admin") {
          navigate("/adminPage", { replace: false });
        } else if (role === "staff") {
          navigate("/staffPage", { replace: false });
        } else if (role === "student") {
          navigate("/studentPage", { replace: false });
        }
      }
    }
  }, [location, navigate, setIsAuthenticated]);

  return null;
}

export default RefrshHandler;
