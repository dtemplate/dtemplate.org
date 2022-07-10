import { CacheProvider } from '@emotion/react';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import createCache, { EmotionCache } from '@emotion/cache';
import theme from '../styles/theme';
import { Container, CssBaseline } from '@mui/material';
import { SessionProvider } from 'next-auth/react';
import Header from '../components/Header/index';
import '../styles/global.css';
import { useRouter } from 'next/router';
import * as gtag from '../../lib/gtag';
import { useEffect } from 'react';
import { Analytics } from '../components/Analytics';

const clientSideEmotionCache = createCache({ key: 'css', prepend: true });

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App(props: MyAppProps) {
  const router = useRouter();
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <SessionProvider>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <Container
            maxWidth="lg"
            style={{
              marginTop: '50px',
            }}
          >
            <Component {...pageProps} />
            <Analytics />
          </Container>
        </ThemeProvider>
      </CacheProvider>
    </SessionProvider>
  );
}
