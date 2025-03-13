import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  FormControl,
  IconButton,
  Alert, // Import Alert for feedback
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import styled from '@emotion/styled';
import { submitClaim } from '../../services/api'; // Import submitClaim

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const ClaimForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [claimAmount, setClaimAmount] = useState('');
  const [description, setDescription] = useState('');
  const [document, setDocument] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('User not logged in.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('claimAmount', claimAmount);
    formData.append('description', description);
    if (document) {
      formData.append('document', document);
    }

    try {
      await submitClaim(formData, token);
      setSuccessMessage('Claim submitted successfully!');
      setName('');
      setEmail('');
      setClaimAmount('');
      setDescription('');
      setDocument(null);

    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to submit claim.');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f4f6f8"
    >
      <Paper elevation={3} sx={{ padding: 4, width: 500 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Submit Claim
        </Typography>
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <form onSubmit={handleSubmit}>
          <Box marginBottom={2}>
            <TextField label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} required variant="outlined" />
          </Box>
          <Box marginBottom={2}>
            <TextField label="Email" type="email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} required variant="outlined" />
          </Box>
          <Box marginBottom={2}>
            <TextField label="Claim Amount" type="number" fullWidth value={claimAmount} onChange={(e) => setClaimAmount(e.target.value)} required variant="outlined" />
          </Box>
          <Box marginBottom={2}>
            <TextField label="Description" multiline rows={4} fullWidth value={description} onChange={(e) => setDescription(e.target.value)} required variant="outlined" />
          </Box>
          <Box marginBottom={2}>
            <FormControl fullWidth variant="outlined">
              <Box display="flex" alignItems="center">
                <IconButton component="label" htmlFor="document-upload" sx={{ marginRight: 2 }}>
                  <PhotoCamera />
                  <Box>
                    <Typography variant="body1" sx={{ display: 'inline-block', marginLeft: 2 }}>
                      {document ? document.name : 'Choose a file'}
                    </Typography>
                  </Box>
                </IconButton>
                <VisuallyHiddenInput type="file" id="document-upload" onChange={(e) => setDocument(e.target.files ? e.target.files[0] : null)} accept="image/*,.pdf" />
              </Box>
            </FormControl>
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
            Submit
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default ClaimForm;