import { ReactElement } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard';

function AppRoutes(
  { setIsLoggedIn } : { setIsLoggedIn : React.Dispatch<React.SetStateAction<boolean>>}
): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard setIsLoggedIn={setIsLoggedIn}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;