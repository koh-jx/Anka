import { ReactElement } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import './AppRoutes.css';

import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

function AppRoutes(
  { 
      isLoggedIn, 
      setIsLoggedIn,
      mode,
      setMode
  } 
  : 
  {
    isLoggedIn: boolean, 
    setIsLoggedIn : React.Dispatch<React.SetStateAction<boolean>>,
    mode: 'light' | 'dark',
    setMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>,
  }
): ReactElement {

  return (
    <BrowserRouter>
      <div 
        className= {mode === 'light' ? "header" : "header-dark"}
      >
        <Header 
          isLoggedIn={isLoggedIn} 
          setIsLoggedIn={setIsLoggedIn} 
          setMode={setMode}
        />
      </div>
      <div 
        className= {mode === 'light' ? "background" : "background-dark"}
      >
      </div>
      <div className="wrapper">  
        { !isLoggedIn && <Login setIsLoggedIn={setIsLoggedIn} />}
        <div className={[isLoggedIn && 'fadeIn'].join(' ')}>
          <Box
              sx={{
                  width: "100%",
                  marginY: "2vh",
                  minHeight: "75vh",
                  backgroundColor: 'primary.light',
                  borderRadius: '20px',
                  boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.25)',
                  padding: '4vh',
                  overflow: 'hidden',
              }}
          >
            { isLoggedIn && 
              <Routes>
                <Route path="/" element={<Dashboard />} />
              </Routes>
            }
          </Box>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default AppRoutes;