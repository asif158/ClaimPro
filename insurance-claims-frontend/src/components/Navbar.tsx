import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../types/user';

interface NavbarProps {
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    onLogout(); // Call the onLogout callback
    navigate('/login');
  };

  const userString = localStorage.getItem('user');
  const user: User = userString ? JSON.parse(userString) : { id: 0, username: '', role: 'patient' };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Claim Tracker
        </Typography>
        {user.role === 'patient' && (
          <Box>
            <Button color="inherit" component={Link} to="/patient/claims">My Claims</Button>
            <Button color="inherit" component={Link} to="/patient/submit">Submit Claim</Button>
          </Box>
        )}
        {user.role === 'insurer' && (
          <Box>
            <Button color="inherit" component={Link} to="/insurer/dashboard">Dashboard</Button>
          </Box>
        )}
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;