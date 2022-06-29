import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import Head from 'next/head';

export default function TemplatesPage() {
  return (
    <React.Fragment>
      <Head>
        <title>All templates | Dev Template</title>
      </Head>
      <Box>
        <Typography variant="h1">Templates</Typography>
        <Typography variant="subtitle1">
          Templates are a set of instructions to create a structure, imagine you
          want to create an api in node.js, instead of needing to download and
          configure lint, commit patterns, typescript... just use an api
          template of nodejs and it will configure all this for you.
        </Typography>
        <Link href="/docs/templates">
          <a>Learn more</a>
        </Link>
      </Box>
      <Box
        sx={{
          mt: 3,
        }}
      >
        <Link href="/templates/publish">
          <a>
            <Button variant="outlined">Publish a template</Button>
          </a>
        </Link>
      </Box>
    </React.Fragment>
  );
}
