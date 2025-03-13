// src/components/Insurer/ClaimReview.tsx
import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { Claim } from '../../types/claim';
import LoadingSpinner from '../shared/LoadingSpinner';
import { getClaimById, updateClaim } from '../../services/api';

const ClaimReview: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [claim, setClaim] = useState<Claim | null>(null);
    const [loading, setLoading] = useState(true);
    const [feedback, setFeedback] = useState('');
    const [status, setStatus] = useState('');
    const [approvedAmount, setApprovedAmount] = useState<number | undefined>(undefined);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchClaim = async () => {
            if (!token) {
                console.error('Token not found');
                setLoading(false);
                return;
            }

            if (!id) {
                console.error('Claim ID not found');
                setLoading(false);
                return;
            }

            try {
                const fetchedClaim = await getClaimById(id, token);
                setClaim(fetchedClaim);
                setFeedback(fetchedClaim.insurerComments ?? '');
                setStatus(fetchedClaim.status);
                setApprovedAmount(fetchedClaim.approvedAmount);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch claim:', error);
                setLoading(false);
            }
        };

        fetchClaim();
    }, [id, token]);

    const handleSave = async () => {
        if (claim && token) {
            try {
                await updateClaim(claim._id, { status, approvedAmount, insurerComments: feedback }, token);
                navigate('/insurer/dashboard');
            } catch (error) {
                console.error('Failed to update claim:', error);
            }
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!claim) {
        return <Typography>Claim not found.</Typography>;
    }

    // Assuming your claim object has a 'document' property with the filename
    const documentUrl = claim.document ? `http://localhost:5000/uploads/${claim.document}` : null; // Adjust URL as needed

    return (
        <Box padding={2}>
            <Typography variant="h4" gutterBottom>Claim Review</Typography>
            <Card>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6">Claim Details</Typography>
                            <Typography>Name: {claim.name}</Typography>
                            <Typography>Email: {claim.email}</Typography>
                            <Typography>Amount: ${claim.claimAmount}</Typography>
                            <Typography>Description: {claim.description}</Typography>
                            <Typography>Submission Date: {claim.submissionDate}</Typography>
                            {documentUrl && (
                                <Box marginTop={2}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        href={documentUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View Document
                                    </Button>
                                </Box>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="status-label">Status</InputLabel>
                                <Select labelId="status-label" id="status" value={status} label="Status" onChange={(e) => setStatus(e.target.value)}>
                                    <MenuItem value="Pending">Pending</MenuItem>
                                    <MenuItem value="Approved">Approved</MenuItem>
                                    <MenuItem value="Rejected">Rejected</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <TextField
                                    label="Approved Amount"
                                    type="number"
                                    value={approvedAmount !== undefined ? approvedAmount : ''}
                                    onChange={(e) => setApprovedAmount((e.target as HTMLInputElement).valueAsNumber)}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <TextField label="Feedback" multiline rows={4} fullWidth margin="normal" value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                    <Box display="flex" justifyContent="flex-end" marginTop={2}>
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Save
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ClaimReview;