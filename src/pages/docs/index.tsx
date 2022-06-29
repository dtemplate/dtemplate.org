import React from 'react';
import { Typography } from '@mui/material';
import Head from 'next/head';

export default function DocsPage() {
  return (
    <React.Fragment>
      <Head>
        <title>All documentation | Dev Template</title>
      </Head>
      <Typography variant="h1" gutterBottom>
        Docs
      </Typography>
    </React.Fragment>
  );
}
