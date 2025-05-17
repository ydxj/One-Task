import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './TousPages/PageHome/PageHome';
import Login from './TousPages/Login/Login';
import Signup from './TousPages/Signup/Signup';
import NotFound from './TousPages/Layout/404';
import UserDashboard from './TousPages/User/dashboard/Dashboard';

import AdminUtilisateur from './TousPages/admin/Dashbord/Dashbord';
import EditUser from './TousPages/admin/Dashbord/EditUser';

import DashboardAdmin from './TousPages/admin/Dashbord/Dashbord';
import Parametres from './TousPages/User/parametre/parametre';


function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<UserDashboard />} />

                <Route path="/admin/users" element={<AdminUtilisateur/>} />
                <Route path="/edit-user/:id" element={<EditUser />} />

                <Route path="/dashboardAdmin" element={<DashboardAdmin/>} />
                <Route path="/modifier-domaine" element={<Parametres/>} />

                {/* Catch-all route for 404 Not Found */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default AppRouter;
