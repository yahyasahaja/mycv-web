import React, { Component } from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

const Container = styled.div`
  display: block;
  width: 350px;
  margin: 20px;
`;

class ProjectSkeleton extends Component {
  render() {
    return (
      <Container>
        <Skeleton width="100%" height={250} />
        <Skeleton width="100%" height={50} />
        <Skeleton width="100%" height={20} />
      </Container>
    );
  }
}

export default ProjectSkeleton;
