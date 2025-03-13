// src/components/Auth/Register.tsx
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/api'; // Import the registerUser function

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await registerUser({ username, email, password });
      navigate('/login'); // Redirect to login after successful registration
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} sx={{ padding: 4, width: 300 }}>
        <Typography variant="h5" align="center" gutterBottom>Register</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField label="Username" fullWidth margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} />
        <TextField label="Email" type="email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" color="primary" fullWidth onClick={handleRegister} sx={{ marginTop: 2 }}>Register</Button>
      </Paper>
    </Box>
  );
};

export default Register;