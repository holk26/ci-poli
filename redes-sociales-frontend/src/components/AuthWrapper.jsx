import { useAuth } from '../contexts/AuthContext';

const AuthWrapper = ({ children }) => {
  const { token } = useAuth();

  return token ? children : null;
};

export default AuthWrapper;
