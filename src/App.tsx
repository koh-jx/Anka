import React, { useState } from 'react';
import './App.css';

import Header from './components/Header';
import AppRoutes from './AppRoutes';
import Login from './components/Login';

import { checkIsLoggedIn } from './lib/api/login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(checkIsLoggedIn());

  return (
    <div className="App">
      <div className="header" >
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      </div>
      <div className="wrapper">
        {!isLoggedIn && <Login setIsLoggedIn={setIsLoggedIn} />}
        {isLoggedIn && < AppRoutes />}
      </div>
    </div>
  );
}

export default App;
