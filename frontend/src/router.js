import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import Home from './TousPages/PageHome/PageHome';
import Login from './TousPages/Login/Login';
import Signup from './TousPages/Signup/Signup';
import NotFound from './TousPages/Layout/404';
import UserDashboard from './TousPages/User/dashboard/Dashboard';
import AdminUtilisateur from './TousPages/admin/Dashbord/Dashbord';
import EditUser from './TousPages/admin/Dashbord/EditUser';
import DashboardAdmin from './TousPages/admin/Dashbord/Dashbord';
import Parametres from './TousPages/User/parametre/parametre';
import ModifierProfil from './TousPages/Layout/Profile';

function ProtectedRoute({ children, role }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/me", { withCredentials: true })
      .then(res => {
        if (res.data.loggedIn) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center mt-5">Chargement...</div>;

  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;

  return children;
}

function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected User Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/modifier-domaine"
          element={
            <ProtectedRoute role="user">
              <Parametres />
            </ProtectedRoute>
          }
        />


        {/* Protected Admin Routes */}
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="admin">
              <AdminUtilisateur />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-user/:id"
          element={
            <ProtectedRoute role="admin">
              <EditUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboardAdmin"
          element={
            <ProtectedRoute role="admin">
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
              <ModifierProfil />
          }
        />

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
