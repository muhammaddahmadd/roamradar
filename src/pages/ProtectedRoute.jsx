import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { useEffect } from "react";
import SpinnerFullPage from "../components/SpinnerFullPage";
import PropTypes from "prop-types";

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return <SpinnerFullPage />;
  }

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;