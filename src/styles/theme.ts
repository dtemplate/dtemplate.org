import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#ffffff',
    },
    primary: {
      main: '#24292f',
    },
    secondary: {
      main: '#3b82f6',
    },
    error: {
      main: '#cf222e',
    },
    warning: {
      main: '#8250df',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
      disabled: '#bdbdbd',
    },
  },
  typography: {
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
    h1: {
      fontSize: '2rem',
      fontWeight: '500',
    },
    h2: {
      fontSize: '1.5rem',
    },
    h3: {
      fontSize: '1.25rem',
    },
    h4: {
      fontSize: '1rem',
    },
    h5: {
      fontSize: '0.875rem',
    },
    h6: {
      fontSize: '0.75rem',
    },
    subtitle1: {
      color: '#757575',
      fontSize: '0.875rem',
    },
  },
});

export default theme;
