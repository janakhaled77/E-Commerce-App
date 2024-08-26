import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

function ProtectedRoute({ children }) {
    const { token } = useContext(UserContext);

    if (token) {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
}

export default ProtectedRoute;
