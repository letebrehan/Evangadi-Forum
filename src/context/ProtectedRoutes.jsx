import React, { useContext, useEffect } from "react";
import { UserContext } from "./UserProvider";
import { useNavigate } from "react-router-dom";
// import { UserContext } from "./UserProvider";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [user] = useContext(UserContext);

  return user ? children : null;
};

export default ProtectedRoute;
