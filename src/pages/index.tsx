import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Build your entire project with one command | Dev Template</title>
      </Head>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 120px)',
          gap: '20px',
        }}
      >
        <Typography
          variant="h1"
          textAlign="center"
          sx={{
            fontSize: '2rem',
            fontWeight: 'normal',
          }}
        >
          Dev Template
        </Typography>
        <Typography variant="h2" textAlign="center">
          Build your entire project with one command
        </Typography>
        <Link href="/templates">
          <a>
            <Button variant="outlined">Explore Templates</Button>
          </a>
        </Link>
      </Box>
    </React.Fragment>
  );
}
