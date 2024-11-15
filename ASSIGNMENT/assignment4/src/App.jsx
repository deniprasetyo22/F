import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import Routes from './Routes';

const App = () => {

  return (
    <RouterProvider router={Routes} />
  );
};

export default App;
