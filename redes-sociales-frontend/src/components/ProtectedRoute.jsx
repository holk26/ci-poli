// Archivo: src/components/ProtectedRoute.jsx
import { useAuth } from "../contexts/useAuth";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Loading from "../components/Loading";
const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <Loading />;
  }

  return isAuthenticated ? element : <Navigate to="/login" />;
};
ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default ProtectedRoute;
