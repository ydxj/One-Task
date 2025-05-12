import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './TousPages/PageHome/PageHome';
import Login from './TousPages/Login/Login';
import Signup from './TousPages/Signup/Signup';
import NotFound from './TousPages/Layout/404';
import UserDashboard from './TousPages/User/dashboard/Dashboard';
import DashboardAdmin from './TousPages/admin/Dashbord/Dashbord';

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/dashboardAdmin" element={<DashboardAdmin/>} />
                {/* Catch-all route for 404 Not Found */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default AppRouter;
