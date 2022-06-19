import { ReactElement } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
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

  const location = useLocation();

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
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              classNames="fade"
              timeout={300}
            >
              <Routes>
                <Route path="/" element={<Dashboard />} />
              </Routes>
            </CSSTransition>
          </TransitionGroup>
        }
      </div>
    </BrowserRouter>
  );
}

export default AppRoutes;