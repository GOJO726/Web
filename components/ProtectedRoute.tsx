import React, { useContext } from 'react';
// Fix: Replaced Navigate with Redirect for react-router-dom v5 compatibility.
import { Redirect, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    if (!user) {
        // Fix: Replaced Navigate component with Redirect for v5.
        return <Redirect to={{ pathname: "/login", state: { from: location } }} />;
    }

    return children;
};

export default ProtectedRoute;