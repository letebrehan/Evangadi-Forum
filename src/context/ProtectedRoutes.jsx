import React, { useContext, useEffect } from "react";
import { UserContext } from "./UserProvider";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [user] = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      navigate("/users/login");
    }
  }, [user, navigate]);

  return user ? children : null;
};

export default ProtectedRoute;
