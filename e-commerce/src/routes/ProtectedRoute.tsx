import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useOutletContext } from 'react-router-dom';
import { auth } from '../services/firebaseConfig';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
}

interface OutletContextType {
  cartItems: CartItem[];
}

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [user] = useAuthState(auth);
  const { cartItems } = useOutletContext<OutletContextType>();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (cartItems.length === 0) {
    return <Navigate to="/cart" />;
  }

  return children;
};

export default ProtectedRoute;
