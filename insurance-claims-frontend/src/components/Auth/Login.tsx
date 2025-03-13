import React, { useState } from 'react';
import {
    TextField,
    Button,
    Box,
    Typography,
    Paper,
    Alert,
    Tabs,
    Tab,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../../services/api';
import { User } from '../../types/user';

interface LoginProps {
    onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [tabValue, setTabValue] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState<'patient' | 'insurer'>('patient');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await loginUser({ email, password });
            localStorage.setItem('token', response.token);
            const user: User = {
                id: response.user.id,
                name: response.user.name,
                email: response.user.email,
                role: response.role,
            };
            localStorage.setItem('user', JSON.stringify(user));
            onLogin(user);
            navigate(user.role === 'patient' ? '/patient/claims' : '/insurer/dashboard');
        } catch (err: any) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('An unexpected error occurred.');
            }
        }
    };

    const handleRegister = async () => {
        try {
            await registerUser({ name, email, password, role });
            setTabValue(0);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
        setError(null);
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Paper elevation={3} sx={{ padding: 4, width: 300 }}>
                <Tabs value={tabValue} onChange={handleTabChange} centered sx={{ marginBottom: 3 }}>
                    <Tab label="Login" />
                    <Tab label="Register" />
                </Tabs>

                {tabValue === 0 && (
                    <Box>
                        <Typography variant="h5" align="center" gutterBottom>Login</Typography>
                        {error && <Alert severity="error">{error}</Alert>}
                        <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Button variant="contained" color="primary" fullWidth onClick={handleLogin} sx={{ marginTop: 2 }}>Login</Button>
                    </Box>
                )}

                {tabValue === 1 && (
                    <Box>
                        <Typography variant="h5" align="center" gutterBottom>Register</Typography>
                        {error && <Alert severity="error">{error}</Alert>}
                        <TextField label="Name" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
                        <TextField label="Email" type="email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Box display="flex" justifyContent="space-around" marginTop={2}>
                            <Button variant={role === 'patient' ? "contained" : "outlined"} onClick={() => setRole("patient")}>Patient</Button>
                            <Button variant={role === 'insurer' ? "contained" : "outlined"} onClick={() => setRole("insurer")}>Insurer</Button>
                        </Box>
                        <Button variant="contained" color="primary" fullWidth onClick={handleRegister} sx={{ marginTop: 2 }}>Register</Button>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default Login;