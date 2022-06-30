import { Box, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { PublishTemplateForm } from '../../../components/PublishTemplateForm';

export default function PublishTemplate() {
  const { status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      window.location.href = '/api/auth/signin';
    }
  }, [status]);

  return (
    <React.Fragment>
      <Head>
        <title>Publish your own template | Dev Template</title>
      </Head>
      <Box>
        <Typography variant="h1">Publish a template</Typography>
        <Typography variant="subtitle1">
          If you&apos;re a programmer, chances are you&apos;ve created your own
          folder structures for various programming projects. Why not share them
          with the world? Publishing your template (folder structure) can help
          other people start their own projects faster.
        </Typography>
      </Box>
      <Box
        sx={{
          mt: 5,
        }}
      >
        <PublishTemplateForm />
      </Box>
    </React.Fragment>
  );
}
