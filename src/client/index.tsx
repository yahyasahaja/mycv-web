import { hot, setConfig } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { COLORS } from './config';
import routes from './routes';
import { ensureReady } from './utils';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
// import * as serviceWorker from './serviceWorker';

setConfig({
  showReactDomPatchNotification: false,
});

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

const App = () => <div>Cobaa</div>;
const Coba = hot(module)(App);

const generateAppComponent = () => {
  return (
    <MuiThemeProvider theme={MUITheme}>
      <Coba />
    </MuiThemeProvider>
  );
};

if (typeof window !== 'undefined') {
  ensureReady(routes).then(() => {
    ReactDOM.hydrate(
      <BrowserRouter>{generateAppComponent()}</BrowserRouter>,
      document.getElementById('root')
    );
  });
}

export const renderOnServer = (location: string) => {
  return ensureReady(routes, location).then(() => (
    <StaticRouter location={location} context={{}}>
      {generateAppComponent()}
    </StaticRouter>
  ));
};
