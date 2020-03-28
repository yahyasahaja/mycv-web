import { hot } from 'react-hot-loader';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: block;
`;

const LandingPage = () => {
  return (
    <Container>
      <div>LandingPage</div>
    </Container>
  );
};

export default hot(LandingPage);
