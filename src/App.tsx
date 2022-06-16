import React, { useState } from 'react';
import './App.css';

import Header from './components/Header';
import AppRoutes from './AppRoutes';
import Login from './components/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <div className="header">
        <Header />
      </div>
      <div className="wrapper">
        {!isLoggedIn && <Login />}
        {isLoggedIn && < AppRoutes />}
      </div>
    </div>
  );
}

export default App;
