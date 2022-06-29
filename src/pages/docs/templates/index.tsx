import { Typography } from '@mui/material';
import Head from 'next/head';
import React from 'react';

export default function TemplateDocs() {
  return (
    <React.Fragment>
      <Head>
        <title>Template documentation | Dev Template</title>
      </Head>
      <Typography variant="h1" gutterBottom>
        Template docs
      </Typography>
    </React.Fragment>
  );
}
