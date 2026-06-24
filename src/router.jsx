import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layouts
import PortfolioLayout from './layouts/PortfolioLayout';
import AdminLayout from './layouts/AdminLayout';

// Portfolio pages
import ProjectDetail from './pages/ProjectDetail';
import AllProjectsPage from './pages/AllProjectsPage';

// Admin Pages
import ProtectedRoute from './admin/ProtectedRoute';
import LoginPage from './admin/LoginPage';
import Dashboard from './admin/Dashboard';
import AnalyticsPage from './admin/AnalyticsPage';
import UsersPage from './admin/UsersPage';
import ProjectsPage from './admin/ProjectsPage';
import SettingsPage from './admin/SettingsPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <PortfolioLayout />
    },
    {
        path: '/projects',
        element: <AllProjectsPage />
    },
    {
        path: '/project/:id',
        element: <ProjectDetail />
    },
    {
        path: '/internal-ops/login',
        element: <LoginPage />
    },
    {
        path: '/internal-ops',
        element: (
            <ProtectedRoute>
                <AdminLayout />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <Navigate to="dashboard" replace /> },
            { path: 'dashboard', element: <Dashboard /> },
            { path: 'analytics', element: <AnalyticsPage /> },
            { path: 'users', element: <UsersPage /> },
            { path: 'projects', element: <ProjectsPage /> },
            { path: 'settings', element: <SettingsPage /> },
        ]
    },
    {
        path: '*',
        element: <Navigate to="/" replace />
    }
]);
