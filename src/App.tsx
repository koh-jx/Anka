import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';

import './App.css';
import AppRoutes from './AppRoutes';
import { checkIsLoggedIn } from './lib/api/login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(checkIsLoggedIn());


  const setTheme = () => {
    const localMode = window.localStorage.getItem('mode');
    if (localMode) {
      return localMode as 'light' | 'dark';
    } else {
      window.localStorage.setItem('mode', 'light');
      return 'light';
    }
  }
  
  const [mode, setMode] = React.useState<'light' | 'dark'>(setTheme());

  const theme = React.useMemo(
    () => {
      window.localStorage.setItem('mode', mode);
      return mode === 'light' ? lightTheme : darkTheme
    }, [mode]
  );

  return (
    // <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <div className="App">
          < AppRoutes 
            isLoggedIn={isLoggedIn} 
            setIsLoggedIn={setIsLoggedIn} 
            mode={mode}
            setMode={setMode}
          />
        </div>
      </ThemeProvider>
    // </ColorModeContext.Provider>
  );
}

export default App;
