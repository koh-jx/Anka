import React, { useState } from 'react';
import './App.css';

import AppRoutes from './AppRoutes';

import { checkIsLoggedIn } from './lib/api/login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(checkIsLoggedIn());

  return (
    <div className="App">
      < AppRoutes isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
    </div>
  );
}

export default App;
