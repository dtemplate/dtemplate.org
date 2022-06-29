import { CacheProvider } from '@emotion/react';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import createCache, { EmotionCache } from '@emotion/cache';
import theme from '../styles/theme';
import { Container, CssBaseline } from '@mui/material';
import { SessionProvider } from 'next-auth/react';
import Header from '../components/Header/index';
import '../styles/global.css';

const clientSideEmotionCache = createCache({ key: 'css', prepend: true });

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <SessionProvider>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <Container
            style={{
              marginTop: '50px',
            }}
          >
            <Component {...pageProps} />
          </Container>
        </ThemeProvider>
      </CacheProvider>
    </SessionProvider>
  );
}
