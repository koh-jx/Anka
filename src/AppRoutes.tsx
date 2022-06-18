import { ReactElement } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './AppRoutes.css';

import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

function AppRoutes(
  { 
      isLoggedIn, 
      setIsLoggedIn 
  } 
  : 
  {isLoggedIn: boolean, setIsLoggedIn : React.Dispatch<React.SetStateAction<boolean>>}
): ReactElement {
  return (
    <BrowserRouter>
      <div className="header">
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      </div>
      <div className="wrapper">
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