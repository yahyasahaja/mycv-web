import { hot, setConfig } from 'react-hot-loader';
import React from 'react';
import { renderRoutes } from 'react-router-config';
import styled, { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';

import { RootState } from './store';
import routes from './routes';
import { MODE } from './theme';
import { backgroundImage, textColor } from './theme';
import MagicWand from './components/MagicWand';

setConfig({
  showReactDomPatchNotification: false,
});

const Container = styled.div`
  display: block;
  background: ${backgroundImage};
  color: ${textColor};
  font-family: 'Open Sans', sans-serif;
  font-size: 12pt;

  a,
  a:visited {
    color: ${textColor};
  }
`;

const App = () => {
  const themeState = useSelector((state: RootState) => {
    return state.themeState;
  });

  return (
    <ThemeProvider theme={{ [MODE]: themeState.theme }}>
      <Container>
        <MagicWand />
        {renderRoutes(routes)}
      </Container>
    </ThemeProvider>
  );
};

export default hot(module)(App);
