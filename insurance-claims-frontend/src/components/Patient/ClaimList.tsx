import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  Chip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Claim } from '../../types/claim';
import LoadingSpinner from '../shared/LoadingSpinner';
import { getClaims } from '../../services/api';

const ClaimList: React.FC = () => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token not found. User not logged in.');
          setLoading(false);
          return;
        }
        const fetchedClaims = await getClaims(token);
        setClaims(fetchedClaims);
      } catch (error) {
        console.error('Error fetching claims:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredClaims = claims.filter(
    (claim) =>
      claim.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedClaims = filteredClaims.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box padding={2}>
      <Typography variant="h4" gutterBottom>
        My Claims
      </Typography>
      <TextField
        label="Search Claims"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Paper>
        <TableContainer sx={{ overflowX: 'auto' }}>
          <Table size={isSmallScreen ? 'small' : 'medium'} aria-label="claims table">
            <TableHead>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>Claim Amount</TableCell>
                {!isSmallScreen && <TableCell>Submission Date</TableCell>}
                {!isSmallScreen && <TableCell>Approved Amount</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedClaims.map((claim) => (
                <TableRow key={claim._id}>
                  <TableCell>
                    <Chip
                      label={claim.status}
                      color={
                        claim.status === 'Approved'
                          ? 'success'
                          : claim.status === 'Rejected'
                            ? 'error'
                            : 'warning'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>${claim.claimAmount}</TableCell>
                  {!isSmallScreen && <TableCell>{claim.submissionDate}</TableCell>}
                  {!isSmallScreen && <TableCell>{claim.approvedAmount ? `$${claim.approvedAmount}` : '-'}</TableCell>}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredClaims.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default ClaimList;