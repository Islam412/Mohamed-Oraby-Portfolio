import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';
import App from './App';
import AdminDashboard from './admin/AdminDashboard';
import AdminLogin from './admin/AdminLogin';

const ProtectedRoute = ({ children }) => {
  const { isAdmin } = useApp();
  return isAdmin ? children : <Navigate to="/admin/login" />;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* الموقع العام */}
        <Route path="/" element={<App />} />
        
        {/* لوحة التحكم */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        
        {/* إعادة توجيه أي مسار غير معروف */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;