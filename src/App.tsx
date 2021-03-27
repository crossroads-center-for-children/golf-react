import React, { useState, useEffect } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import routes from './routes';
import { generateRoutes } from './lib/generators';
import { getPayPalClientId } from './lib/getters';
import theme from './theme';

import '../src/sass/App.scss';

interface Options {
  'client-id': string;
  currency: string;
  intent: string;
}

function App(): JSX.Element | null {
  const [clientId, setClientId] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const routing = useRoutes([
    ...generateRoutes(routes),
    {
      path: '*',
      element: <Navigate to="/" />,
    },
  ]);

  useEffect(() => {
    const init = async (): Promise<void> => {
      const slug = process.env.REACT_APP_PAYPAL_CLIENT_ID_SLUG || '_';
      const clientId = await getPayPalClientId(slug);
      setClientId(clientId);
    };

    init();
  });

  useEffect(() => {
    if (clientId) {
      setIsLoading(false);
    }
  }, [clientId]);

  const buildOptions = (): Options => {
    const options = {
      'client-id': clientId,
      currency: 'USD',
      intent: 'capture',
    };

    return options;
  };

  if (isLoading) return null;

  return (
    <ThemeProvider theme={theme}>
      <PayPalScriptProvider options={buildOptions()}>
        {routing}
      </PayPalScriptProvider>
    </ThemeProvider>
  );
}

export default App;
