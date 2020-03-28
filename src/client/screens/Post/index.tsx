import { hot } from 'react-hot-loader';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: block;
`;

const Post = () => {
  return (
    <Container>
      <div>Post</div>
    </Container>
  );
};

export default hot(module)(Post);
