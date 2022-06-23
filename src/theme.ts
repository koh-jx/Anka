import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
export const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#2F423A',    // Bluish-green
      light: '#94e2e4',   // Light blue - for backgrounds of components
      dark: '#DB5375',    // Bluish-green
    },
    secondary: {
      main: '#83A0A0',    // Lighter blue - For cancel buttons etc
    },
    error: {
      main: red.A400,     // Straight up red
    },
    info: {
      main: '#FFFFFF',    // Black
    },
    background: {
      default: '#FFDBB5', // Sand for overall bg
    },
    text: {
      primary: '#FFFFFF',   // Black
      secondary: '#000000', // White
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
      main: '#4e165c',      // Dark purple
      light: '#3e5641',     // Green - For backgrounds of components
      dark: '#b42145',
    },
    secondary: {
      main: '#63396e',      // Light purple - For cancel buttons etc
    },
    error: {
      main: '#a24936',      // Orange
    },
    info: {
      main: '#f0f8ff',      // White
    },
    background: {
      default: '#373737',   // Dark grey for overall bg
    },
    text: {
      primary: '#000000',   // White
      secondary: '#FFFFFF', // Black
    }
  },
  typography: {
    fontFamily: '"Staatliches", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});