import { hot } from 'react-hot-loader';
import React from 'react';
import styled from 'styled-components';
import Header from './Intro';

const Container = styled.div`
  display: block;
`;

const Home = () => {
  return (
    <Container>
      <Header />
    </Container>
  );
};

export default hot(module)(Home);
