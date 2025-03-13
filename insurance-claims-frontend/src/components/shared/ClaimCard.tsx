// src/components/shared/ClaimCard.tsx
import React from 'react';
import { Card, CardContent, Typography, Button, Box, Chip } from '@mui/material';
import { Claim } from '../../types/claim';
import { useNavigate } from 'react-router-dom';

interface ClaimCardProps {
  claim: Claim;
}

const ClaimCard: React.FC<ClaimCardProps> = ({ claim }) => {
  const navigate = useNavigate();

  const handleReviewClick = () => {
    navigate(`/insurer/review/${claim._id}`);
  };

  const getStatusChip = (status: string) => {
    let color: 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' = 'default';
    let variant: 'filled' | 'outlined' = 'filled';

    switch (status.toLowerCase()) {
      case 'pending':
        color = 'warning';
        break;
      case 'approved':
        color = 'success';
        break;
      case 'rejected':
        color = 'error';
        break;
      default:
        color = 'default';
    }
    return (
      <Chip
        label={status}
        color={color}
        variant={variant}
        size="small"
      />
    );
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{claim.name}</Typography>
        <Typography>Email: {claim.email}</Typography>
        <Typography>Amount: ${claim.claimAmount}</Typography>
        <Box display="flex" alignItems="center" marginTop={1}>
          <Typography>Status: </Typography>
          <Box marginLeft={1}>{getStatusChip(claim.status)}</Box>
        </Box>
        <Button variant="outlined" onClick={handleReviewClick} style={{ marginTop: '10px' }}>
          Review
        </Button>
      </CardContent>
    </Card>
  );
};

export default ClaimCard;