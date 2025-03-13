import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import ClaimForm from './components/Patient/ClaimForm';
import ClaimList from './components/Patient/ClaimList';
import ClaimsDashboard from './components/Insurer/ClaimsDashboard';
import ClaimReview from './components/Insurer/ClaimReview';
import { User } from './types/user';
import Navbar from './components/Navbar';
import { Box, CssBaseline, Container } from '@mui/material';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (user: User) => {
    setUser(user);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const ProtectedRoute = ({ children }: { children: React.JSX.Element }) => {
    if (!localStorage.getItem('token')) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const PatientRoute = ({ children }: { children: React.JSX.Element }) => {
    if (!user || user.role !== 'patient') {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const InsurerRoute = ({ children }: { children: React.JSX.Element }) => {
    if (!user || user.role !== 'insurer') {
      return <Navigate to="/login" />;
    }
    return children;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <CssBaseline />
        {user && <Navbar onLogout={handleLogout} />}
        <Container maxWidth="lg" sx={{ flexGrow: 1, padding: 3 }}>
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/" element={<Navigate to="/login" />} />

            <Route path="/patient/claims" element={
              <ProtectedRoute>
                <PatientRoute>
                  <ClaimList />
                </PatientRoute>
              </ProtectedRoute>
            } />
            <Route path="/patient/submit" element={
              <ProtectedRoute>
                <PatientRoute>
                  <ClaimForm />
                </PatientRoute>
              </ProtectedRoute>
            } />

            <Route path="/insurer/dashboard" element={
              <ProtectedRoute>
                <InsurerRoute>
                  <ClaimsDashboard />
                </InsurerRoute>
              </ProtectedRoute>
            } />
            <Route path="/insurer/review/:id" element={
              <ProtectedRoute>
                <InsurerRoute>
                  <ClaimReview />
                </InsurerRoute>
              </ProtectedRoute>
            } />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App;