import { hot, setConfig } from 'react-hot-loader';
import React from 'react';
import { renderRoutes } from 'react-router-config';
import styled, { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { SkeletonTheme } from 'react-loading-skeleton';

import { RootState } from './store';
import routes from './routes';
import { MODE, THEME_DARK } from './theme';
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

  let skeletonColor = '';
  let highlightColor = '';

  if (themeState.theme === THEME_DARK) {
    skeletonColor = '#232323';
    highlightColor = '#616161';
  } else {
    skeletonColor = '#d8d8d8';
    highlightColor = '#e6e6e6';
  }

  return (
    <ThemeProvider theme={{ [MODE]: themeState.theme }}>
      <SkeletonTheme color={skeletonColor} highlightColor={highlightColor}>
        <Container>
          <MagicWand />
          {renderRoutes(routes)}
        </Container>
      </SkeletonTheme>
    </ThemeProvider>
  );
};

export default hot(module)(App);
