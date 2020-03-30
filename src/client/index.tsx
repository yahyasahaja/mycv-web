import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { COLORS, BASE_URL } from './config';
import routes from './routes';
import { ensureReady } from './utils';
import App from './App';
import { store, RootState, createNewStore } from './store';
import axios from 'axios';
import { Store } from 'redux';

const MUITheme = createMuiTheme({
  palette: {
    primary: {
      main: COLORS.primary,
    },
    secondary: {
      main: COLORS.secondary,
    },
  },
});

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers['Accept'] = 'application/json';
axios.defaults.headers['Content-Type'] = 'application/json';

const generateAppComponent = () => {
  return (
    <MuiThemeProvider theme={MUITheme}>
      <App />
    </MuiThemeProvider>
  );
};

if (typeof window !== 'undefined') {
  const stringState = document.getElementById('state')?.innerHTML;
  let preloadedState: RootState | undefined = undefined;
  let serverStore: Store | undefined = undefined;

  try {
    const parsedProps = JSON.parse(stringState || '');
    preloadedState = parsedProps;
    serverStore = createNewStore(preloadedState);
  } catch (err) {
    preloadedState = undefined;
  }

  ensureReady(routes).then(() => {
    ReactDOM.hydrate(
      <BrowserRouter>
        <Provider store={serverStore || store}>
          {generateAppComponent()}
        </Provider>
      </BrowserRouter>,
      document.getElementById('root')
    );
  });
}

export const renderOnServer = (location: string, serverStore?: Store) => {
  return ensureReady(routes, location).then(() => (
    <Provider store={serverStore || store}>
      <StaticRouter location={location} context={{}}>
        {generateAppComponent()}
      </StaticRouter>
    </Provider>
  ));
};
