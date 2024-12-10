import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/integration-continue-exo-react" replace/>;
  }

  return children;
};

export default ProtectedRoute;