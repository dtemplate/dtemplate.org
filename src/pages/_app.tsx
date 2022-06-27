import { CacheProvider } from "@emotion/react";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import createCache, { EmotionCache } from "@emotion/cache";
import theme from "../styles/theme";
import { CssBaseline } from "@mui/material";

const clientSideEmotionCache = createCache({ key: "css", prepend: true });

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}
