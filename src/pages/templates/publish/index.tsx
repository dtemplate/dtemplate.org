import { Alert, Box, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { PublishTemplateForm } from '../../../components/PublishTemplateForm';

export default function PublishTemplate() {
  const [message, setMessage] = useState<
    | {
        type: 'success' | 'error';
        text: string;
      }
    | undefined
  >();
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      window.location.href = '/api/auth/signin';
    }
  }, [status]);

  const onSubmit = (data: any) => {
    setMessage(undefined);
    fetch('/api/templates/publish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(async response => {
        window.scrollTo(0, 0);
        const data = await response.json();
        if (response.status === 201) {
          setMessage({
            type: 'success',
            text: 'Template published successfully',
          });
          router.push('/templates');
        } else {
          setMessage({
            type: 'error',
            text: data.error,
          });
        }
      })
      .catch((error: any) => {
        window.scrollTo(0, 0);
        setMessage({
          type: 'error',
          text: error.message,
        });
      });
  };

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
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {message && (
          <Box
            sx={{
              mb: 5,
              width: '100%',
            }}
          >
            <Alert severity={message.type}>{message.text}</Alert>
          </Box>
        )}
        <PublishTemplateForm onSubmit={onSubmit} />
      </Box>
    </React.Fragment>
  );
}
