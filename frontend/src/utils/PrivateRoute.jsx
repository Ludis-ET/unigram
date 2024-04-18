import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context";

export const PrivateRoute = ({ Component }) => {
  let { user } = useContext(AuthContext);

  return user ? <Component /> : <Navigate to="/login" />;
};
