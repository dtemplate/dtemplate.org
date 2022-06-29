import { Grid, Typography } from '@mui/material';
import Head from 'next/head';
import React from 'react';

export default function NotFoundPage() {
  return (
    <React.Fragment>
      <Head>
        <title>Ops this page does not exist | Dev Template</title>
      </Head>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100%' }}
      >
        <Grid item xs={3}>
          <Typography
            sx={{
              fontSize: '5rem',
            }}
            textAlign="center"
            variant="h1"
          >
            404
          </Typography>
          <Typography textAlign="center">Page Not Found</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
