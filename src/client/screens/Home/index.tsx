import { hot } from 'react-hot-loader';
import React from 'react';
import styled from 'styled-components';
import Intro from './Intro';
import Posts from './Posts';

const Container = styled.div`
  display: block;
`;

const Home = () => {
  return (
    <Container>
      <Intro />
      <Posts />
    </Container>
  );
};

export default hot(module)(Home);
