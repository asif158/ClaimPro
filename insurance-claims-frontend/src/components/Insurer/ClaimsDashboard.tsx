// const claims: Claim[] = [
//   { _id: 1, name: 'John Doe', email: 'john@example.com', claimAmount: 100, description: 'Medical bill', status: 'Pending', submissionDate: '2023-10-27' },
//   { _id: 2, name: 'Jane Smith', email: 'jane@example.com', claimAmount: 200, description: 'Prescription', status: 'Approved', submissionDate: '2023-10-26', approvedAmount: 200 },
//   { _id: 3, name: 'Alice Johnson', email: 'alice@example.com', claimAmount: 150, description: 'Dental checkup', status: 'Rejected', submissionDate: '2023-10-25', insurerComments: 'Insufficient documentation' },
//   { _id: 4, name: 'Bob Williams', email: 'bob@example.com', claimAmount: 300, description: 'Eye exam', status: 'Pending', submissionDate: '2023-10-28' },
//   { _id: 5, name: 'Charlie Brown', email: 'charlie@example.com', claimAmount: 50, description: 'Pharmacy', status: 'Approved', submissionDate: '2023-10-24', approvedAmount: 50 },
//   { _id: 6, name: 'David Lee', email: 'david@example.com', claimAmount: 250, description: 'Specialist visit', status: 'Rejected', submissionDate: '2023-10-23', insurerComments: 'Out of network' },
//   { _id: 7, name: 'Eve White', email: 'eve@example.com', claimAmount: 120, description: 'Lab tests', status: 'Pending', submissionDate: '2023-10-22' },
//   { _id: 8, name: 'Frank Miller', email: 'frank@example.com', claimAmount: 180, description: 'Therapy', status: 'Approved', submissionDate: '2023-10-21', approvedAmount: 180 },
//   { _id: 9, name: 'Grace Davis', email: 'grace@example.com', claimAmount: 90, description: 'Checkup', status: 'Rejected', submissionDate: '2023-10-20', insurerComments: 'Missing information' },
//   { _id: 10, name: 'Henry Wilson', email: 'henry@example.com', claimAmount: 220, description: 'Emergency', status: 'Pending', submissionDate: '2023-10-19' },
//   { _id: 11, name: 'Ivy Moore', email: 'ivy@example.com', claimAmount: 110, description: 'Follow-up', status: 'Approved', submissionDate: '2023-10-18', approvedAmount: 110 },
//   { _id: 12, name: 'Jack Taylor', email: 'jack@example.com', claimAmount: 160, description: 'X-ray', status: 'Rejected', submissionDate: '2023-10-17', insurerComments: 'Not covered' },
// ];
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid, // Import Grid
} from '@mui/material';
import LoadingSpinner from '../shared/LoadingSpinner';
import ClaimCard from '../shared/ClaimCard';
import { Claim } from '../../types/claim';
import { getAllClaims } from '../../services/api';

const ClaimsDashboard: React.FC = () => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [minAmount, setMinAmount] = useState<number | undefined>(undefined);
  const [maxAmount, setMaxAmount] = useState<number | undefined>(undefined);

  useEffect(() => {
    const fetchClaims = async () => {
      if (!token) {
        console.error('Token not found');
        setLoading(false);
        return;
      }
      try {
        const fetchedClaims = await getAllClaims(token);
        setClaims(fetchedClaims);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch claims:', error);
        setLoading(false);
      }
    };

    fetchClaims();
  }, [token]);

  const filteredClaims = claims.filter((claim) => {
    const statusMatch = statusFilter === 'All' || claim.status === statusFilter;
    const dateMatch =
      (!startDate || new Date(claim.submissionDate) >= new Date(startDate)) &&
      (!endDate || new Date(claim.submissionDate) <= new Date(endDate));
    const amountMatch =
      (minAmount === undefined || isNaN(minAmount) || claim.claimAmount >= minAmount) &&
      (maxAmount === undefined || isNaN(maxAmount) || claim.claimAmount <= maxAmount);
    return statusMatch && dateMatch && amountMatch;
  });

  const handleMinAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinAmount(e.target.valueAsNumber);
  };

  const handleMaxAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxAmount(e.target.valueAsNumber);
  };

  const pendingCount = claims.filter((claim) => claim.status === 'Pending').length;
  const approvedCount = claims.filter((claim) => claim.status === 'Approved').length;
  const totalCount = claims.length;

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box padding={2}>
      <Typography variant="h4" gutterBottom>Claims Dashboard</Typography>

      <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '16px' }}>
        <div style={{ width: '30%', minWidth: '300px', margin: '8px' }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Claims</Typography>
              <Typography variant="h5">{totalCount}</Typography>
            </CardContent>
          </Card>
        </div>
        <div style={{ width: '30%', minWidth: '300px', margin: '8px' }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Pending Claims</Typography>
              <Typography variant="h5">{pendingCount}</Typography>
            </CardContent>
          </Card>
        </div>
        <div style={{ width: '30%', minWidth: '300px', margin: '8px' }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Approved Claims</Typography>
              <Typography variant="h5">{approvedCount}</Typography>
            </CardContent>
          </Card>
        </div>
      </div>

      <Grid container spacing={2} marginBottom={2}>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel id="status-filter-label">Filter by Status</InputLabel>
            <Select labelId="status-filter-label" id="status-filter" value={statusFilter} label="Filter by Status" onChange={(e) => setStatusFilter(e.target.value)}>
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Approved">Approved</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField label="Start Date"
            InputLabelProps={{ shrink: true }}
            type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} fullWidth />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField label="End Date"
            InputLabelProps={{ shrink: true }}
            type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)} fullWidth />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField label="Min Amount" type="number" value={minAmount !== undefined ? minAmount : ''} onChange={handleMinAmountChange} fullWidth />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField label="Max Amount" type="number" value={maxAmount !== undefined ? maxAmount : ''} onChange={handleMaxAmountChange} fullWidth />
        </Grid>
      </Grid>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredClaims.map((claim) => (
          <div key={claim._id} style={{ width: '30%', minWidth: '300px', margin: '8px' }}>
            <ClaimCard claim={claim} />
          </div>
        ))}
      </div>
    </Box>
  );
};

export default ClaimsDashboard;