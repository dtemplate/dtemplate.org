import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#eeeeee',
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
});

export default theme;
