import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
export const lightTheme = createTheme({
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
    info: {
      main: '#FFFFFF',
    },
    background: {
      default: '#FFDBB5',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#f0f8ff',
    }
  },
  typography: {
    fontFamily: '"Staatliches", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  
});

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#4e165c',
    },
    secondary: {
      main: '#63396e',
    },
    error: {
      main: '#a24936',
    },
    info: {
      main: '#f0f8ff',
    },
    background: {
      default: '#373737',
    },
    text: {
      primary: '#f0f8ff',
      secondary: '#FFFFFF',
    }
  },
  typography: {
    fontFamily: '"Staatliches", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});