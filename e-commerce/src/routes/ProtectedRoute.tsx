import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useOutletContext } from 'react-router-dom';
import { auth } from '../services/firebaseConfig';

const ProtectedRoute = ({ children }) => {
  const [user] = useAuthState(auth);
  const { cartItems } = useOutletContext();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (cartItems.length === 0) {
    return <Navigate to="/cart" />;
  }

  return children;
};

export default ProtectedRoute;
