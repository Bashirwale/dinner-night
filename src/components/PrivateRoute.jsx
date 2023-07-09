import { Navigate, Outlet } from "react-router-dom";
import UseAuthStatus from "../hooks/UseAuthStatus";

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = UseAuthStatus();
  if (checkingStatus) {
    return <h1>Signing in</h1>;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;