import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Build your entire project with one command | Dev Template</title>
      </Head>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 'calc(100vh - 200px)',
          gap: '40px',
          flexDirection: {
            md: 'row',
            xs: 'column',
          },
        }}
      >
        <Box>
          <Image
            src="https://ik.imagekit.io/Theryston/exemple-use-dt_hNaYtBGcB.gif"
            alt="DT cli use exemple"
            width={570}
            height={285}
            objectFit="cover"
            objectPosition="bottom"
            style={{
              borderRadius: '20px',
              borderTopLeftRadius: '0px',
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            alignItems: {
              md: 'flex-start',
              xs: 'center',
            },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              textAlign: {
                md: 'left',
                xs: 'center',
              },
            }}
          >
            Dev Template
          </Typography>
          <Typography
            variant="h2"
            sx={{
              textAlign: {
                md: 'left',
                xs: 'center',
              },
            }}
          >
            Build your entire project with one command
          </Typography>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              gap: '20px',
              justifyContent: {
                md: 'flex-start',
                xs: 'center',
              },
            }}
          >
            <Link href="/docs/cli/install">
              <a>
                <Button variant="outlined">Install The CLI</Button>
              </a>
            </Link>
            <Link href="/templates">
              <a>
                <Button variant="text">Explore Templates</Button>
              </a>
            </Link>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
