import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#2F423A',
    },
    secondary: {
      main: '#83A0A0',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;