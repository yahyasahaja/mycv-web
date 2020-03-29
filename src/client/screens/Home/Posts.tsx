import { hot } from 'react-hot-loader';
import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import ProjectCard from '../../components/ProjectCard';
import { fetchPostsAction } from '../../store/Post/actions';
import Plx from 'react-plx';
import { postsTitle } from './introParallaxData';
import ProjectSkeleton from '../../components/ProjectSkeleton';

const Container = styled.div`
  display: block;

  .title {
    font-size: 30pt;
    font-weight: 600;
    text-align: center;
    margin-bottom: 40px;
    padding-bottom: 20px;
  }

  .posts,
  .skeletons {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 20px;
    flex-wrap: wrap;
  }
`;

const Posts = () => {
  const dispatch = useDispatch();
  const postState = useSelector((state: RootState) => {
    return state.postState;
  });
  React.useEffect(() => {
    dispatch(fetchPostsAction());
  }, []);

  return (
    <Container>
      <Plx parallaxData={postsTitle}>
        <div className="title">Portfolio</div>
      </Plx>

      <div className="posts">
        {postState.posts.map((post, i) => {
          return <ProjectCard post={post} key={i} />;
        })}
      </div>
      {postState.isFetchingPosts && (
        <div className="skeletons">
          <ProjectSkeleton />
          <ProjectSkeleton />
          <ProjectSkeleton />
          <ProjectSkeleton />
          <ProjectSkeleton />
          <ProjectSkeleton />
        </div>
      )}
    </Container>
  );
};

export default hot(module)(Posts);
