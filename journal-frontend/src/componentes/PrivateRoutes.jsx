import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function PrivateRoutes({ children }) {
    const { usuario } = useContext(AuthContext);
    return usuario ? children : <Navigate to="/login" />;
}

export default PrivateRoutes;
