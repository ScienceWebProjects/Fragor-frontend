// libs
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// components
import PrimaryButton from 'components/ui/Button/PrimaryButton';

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <div className='App-wrapper'>
          <header className='App-content'>
            <PrimaryButton type='button'>Button</PrimaryButton>
          </header>
        </div>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
