import { hot, setConfig } from 'react-hot-loader';
import React from 'react';
import { renderRoutes } from 'react-router-config';
import routes from './routes';
import styled from 'styled-components';

setConfig({
  showReactDomPatchNotification: false,
});

const Container = styled.div`
  display: block;
`;

const App = () => {
  return <Container>{renderRoutes(routes)}</Container>;
};

export default hot(module)(App);
