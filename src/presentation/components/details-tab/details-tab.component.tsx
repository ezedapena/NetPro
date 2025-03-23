import React from 'react';
import { Box, Typography, Grid2 as Grid, Stack } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

interface DetailsTabProps {
  clientName: string;
  dateOfBirth: string;
  dateOfIncident: string;
  lawFirm: string;
}

export const DetailsTab: React.FC<DetailsTabProps> = ({
  clientName,
  dateOfBirth,
  dateOfIncident,
  lawFirm,
}) => {
  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={3}>
        <Grid>
          <Stack spacing={3}>
            <Box>
              <Typography variant="subtitle2" sx={{ color: '#888', mb: 0.5 }}>
                Client Name:
              </Typography>
              <Typography variant="body1">{clientName}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ color: '#888', mb: 0.5 }}>
                Date of Birth:
              </Typography>
              <Typography variant="body1">{dateOfBirth}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ color: '#888', mb: 0.5 }}>
                DATE OF INCIDENT:
              </Typography>
              <Typography variant="body1">{dateOfIncident}</Typography>
            </Box>
          </Stack>
        </Grid>

        <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Stack direction="row" spacing={1}>
            <AccountBalanceIcon sx={{ color: '#000' }} />
            <Typography variant="body1">{lawFirm}</Typography>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
