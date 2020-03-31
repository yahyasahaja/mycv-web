import { hot } from 'react-hot-loader';
import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import Intro from './Intro';
import Posts from './Posts';

const Container = styled.div`
  display: block;
`;

const Home = () => {
  return (
    <Container>
      <Helmet>
        <title>Yahya Sahaja</title>
        <meta
          name="description"
          content="Yahya sahaja web portfolio, welcome <^.^>"
        />
      </Helmet>
      <Intro />
      <Posts />
    </Container>
  );
};

export default hot(module)(Home);
