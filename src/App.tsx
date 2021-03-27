import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

import { paypal } from './env';
import routes from './routes';
import { generateRoutes } from './lib';
import theme from './theme';

import '../src/sass/App.scss';

function App() {
  const routing = useRoutes([
    ...generateRoutes(routes),
    {
      path: '*',
      element: <Navigate to="/" />,
    },
  ]);

  const initialOptions = {
    'client-id':
      process.env.REACT_APP_PAYPAL_CLIENT_ID || paypal.PAYPAL_CLIENT_ID,
    currency: 'USD',
    intent: 'capture',
  };

  return (
    <ThemeProvider theme={theme}>
      <PayPalScriptProvider options={initialOptions}>
        {routing}
      </PayPalScriptProvider>
    </ThemeProvider>
  );
}

export default App;
