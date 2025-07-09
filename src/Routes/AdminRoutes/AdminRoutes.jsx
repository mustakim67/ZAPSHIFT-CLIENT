import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useUserRole from '../../Hooks/useUserRole';
import { Navigate, useLocation } from 'react-router';

const AdminRoutes = ({ children }) => {
    const { user, loading } = useAuth(); // CALL the hook here
    const { role, roleLoading } = useUserRole();
    const location = useLocation();

    if (loading || roleLoading) {
        return <span className='loading loading-spinner loading-xl'></span>;
    }

    if (!user || role !== 'admin') {
        // Redirect to forbidden page and keep track of attempted location
        return <Navigate to="/forbidden" state={{ from: location.pathname }} replace />;
    }

    return children;
};

export default AdminRoutes;
