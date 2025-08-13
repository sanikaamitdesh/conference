import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './pages/Login';
import Register from './pages/Register';
import PresenterHome from './pages/PresenterHome';
import AttendeeHome from './pages/AttendeeHome';
import AdminHome from './pages/AdminHome';
import AdminDashboard from './pages/AdminDashboard';
import AddPaper from './pages/AddPaper'; 
// import ScheduleManager from './pages/ScheduleManager';
import CommunicationCenter from './pages/CommunicationCenter';
import PresenterManagement from './pages/PresenterManagement';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AddSpecialSession from './pages/AddSpecialSession';
import DomainPaperChart from './pages/DomainPaperChart';
import HomePage from './pages/HomePage';
// import Timetable from './pages/Timetable';
import AdminSlotAllocationPage from './pages/AdminSlotAllocationPage';
import Layout from './components/Layout';

import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00838F', // Darker turquoise as main color
      light: '#4DD0E1', // Previous main color becomes light
      dark: '#006064', // Even darker shade for hover/emphasis
      contrastText: '#fff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#00838F',
          '&:hover': {
            backgroundColor: '#006064',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#00838F',
        },
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AuthProvider>
            <NotificationProvider>
              <Routes>
                {/* Auth routes without Layout */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />

                {/* Public routes with Layout */}
                <Route path="/" element={<HomePage />} />
                {/* <Route path="/timetable" element={
                  <Layout>
                    <Timetable />
                  </Layout>
                } /> */}

                {/* Protected routes with Layout */}
                <Route
                  path="/presenter"
                  element={
                    <PrivateRoute role="presenter">
                      <Layout>
                        <PresenterHome />
                      </Layout>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/attendee"
                  element={
                    <PrivateRoute role="attendee">
                      <Layout>
                        <AttendeeHome />
                      </Layout>
                    </PrivateRoute>
                  }
                />

                {/* Admin routes with Layout */}
                <Route
                  path="/admin"
                  element={
                    <PrivateRoute role="admin">
                      <Layout>
                        <AdminHome />
                      </Layout>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/dashboard"
                  element={
                    <PrivateRoute role="admin">
                      <Layout>
                        <AdminDashboard />
                      </Layout>
                    </PrivateRoute>
                  }
                />
                {/* <Route
                  path="/admin/schedule"
                  element={
                    <PrivateRoute role="admin">
                      <Layout>
                        <ScheduleManager />
                      </Layout>
                    </PrivateRoute>
                  }
                /> */}
                <Route
                  path="/admin/communications"
                  element={
                    <PrivateRoute role="admin">
                      <Layout>
                        <CommunicationCenter />
                      </Layout>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/add-paper"
                  element={
                    <PrivateRoute role="admin">
                      <Layout>
                        <AddPaper />
                      </Layout>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/presenters"
                  element={
                    <PrivateRoute role="admin">
                      <Layout>
                        <PresenterManagement />
                      </Layout>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/add-special-session"
                  element={
                    <PrivateRoute role="admin">
                      <Layout>
                        <AddSpecialSession />
                      </Layout>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/slot-allocation"
                  element={
                    <PrivateRoute role="admin">
                      <Layout>
                        <AdminSlotAllocationPage />
                      </Layout>
                    </PrivateRoute>
                  }
                />
              </Routes>
            </NotificationProvider>
          </AuthProvider>
        </LocalizationProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
