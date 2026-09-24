import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
export const PrivateRoute = () => {  
    const token = sessionStorage.getItem('token')
    return token ? <Outlet/> : <Navigate to="/login" />;
};

export const PrivateRoutes = () => {
    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('role');
    if (!token) {
        return <Outlet />;
    }
    return role === 'admin' ? <Navigate to="/admindashboard" /> : <Navigate to="/userdashboard" />;
}

export default PrivateRoute;