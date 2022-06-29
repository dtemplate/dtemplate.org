import { Typography } from '@mui/material';
import Head from 'next/head';
import React from 'react';

export default function PublishTemplate() {
  return (
    <React.Fragment>
      <Head>
        <title>Publish your own template | Dev Template</title>
      </Head>
      <Typography variant="h1" gutterBottom>
        Publish a template
      </Typography>
    </React.Fragment>
  );
}
