import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#177C8B',
    },
    secondary: {
      main: '#084A62',
    },
    error: {
      main: '#DC3C35',
    },
    warning: {
      main: '#FFCA5A',
    },
    text: {
      primary: '#333031',
    },
    brand: {
      primary: '#177C8B',
      secondary: '#084A62',
      accent: '#DC3C35',
      warning: '#FFCA5A',
      neutral: '#333031',
    },
  },
});

export default theme;
