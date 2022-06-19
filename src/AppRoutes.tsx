import { ReactElement } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
        className= {mode === 'light' ? "wrapper" : "wrapper-dark"}
      >
        { !isLoggedIn && <Login setIsLoggedIn={setIsLoggedIn} />}
        { isLoggedIn && 
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        }
      </div>
    </BrowserRouter>
  );
}

export default AppRoutes;