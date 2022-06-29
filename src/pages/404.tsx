import { Grid, Typography } from '@mui/material';
import React from 'react';

export default function NotFoundPage() {
  return (
    <React.Fragment>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100%' }}
      >
        <Grid item xs={3}>
          <Typography variant="h1">404</Typography>
          <Typography textAlign="center">Page Not Found</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
