import React, { Component } from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

const Container = styled.div`
  display: block;
  width: 100%;
  padding: 50px;

  .image {
    margin: auto;
    width: 50%;
    margin-bottom: 20px;
  }
`;

class ProjectDetailsSkeleton extends Component {
  render() {
    return (
      <Container>
        <div className="image">
          <Skeleton width="100%" height={250} />
        </div>
        <Skeleton width="100%" height={20} />
        <Skeleton width="100%" height={20} />
        <Skeleton width="100%" height={20} />
        <Skeleton width="100%" height={20} />
        <Skeleton width="100%" height={20} />
        <Skeleton width="100%" height={20} />
        <Skeleton width="100%" height={20} />
        <Skeleton width="100%" height={20} />
      </Container>
    );
  }
}

export default ProjectDetailsSkeleton;
