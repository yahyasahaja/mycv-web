import React from 'react';
import styled from 'styled-components';
import { hot } from 'react-hot-loader';
import { Post } from '../store/Post/types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { fetchPost } from '../repository';
import { setPost } from '../store/Post/actions';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { backgroundColor } from '../theme';

const Container = styled.div`
  display: block;
  border-radius: 20px;
  background: ${backgroundColor};
  box-shadow: 1px 1px 60px 0px #00000040;
  margin: 20px 10px;
  margin-top: 10px;
  overflow: hidden;
  max-width: 350px;
  cursor: pointer;
  user-select: none;
  border: 1px solid white;
  transition: 0.2s;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1.05);
    opacity: 0.5;
    transition: 0.1s;
  }

  @media only screen and (min-width: 800px) {
    margin: 40px;
    box-shadow: 10px 10px 60px 0px #00000040;
  }

  &:active {
    opacity: 0.3;
    transition: 0.03s;
  }

  .picture {
    width: 100%;
    height: 250px;
    padding: 10px;

    span {
      height: 250px;
      width: 100%;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
    }
  }

  .details {
    display: block;
    padding: 20px;
    /* border-top: 1px solid #d2d2d2; */

    .card-title {
      font-size: 15pt;
      font-weight: 300;
      margin-bottom: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      white-space: nowrap;
    }

    .text {
      font-size: 10pt;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      white-space: nowrap;
    }
  }
`;

export interface Props extends RouteComponentProps {
  post: Post;
}

const ProjectCard = (props: Props) => {
  const { post, history, location } = props;

  return (
    <Container
      onClick={() => {
        setPost(post);
        fetchPost(post.id);
        history.push({
          pathname: `/posts/${post.id}`,
          state: {
            prevPath: location.pathname,
          },
        });
      }}
    >
      <div className="picture">
        <LazyLoadImage
          alt="profile picture"
          placeholderSrc="/images/flat-pp.jpg"
          src={post.image_url}
          effect="blur"
        />
      </div>

      <div className="details">
        <div className="card-title">{post.title}</div>
        <div className="text">{post.textContent}</div>
      </div>
    </Container>
  );
};

export default hot(module)(withRouter(ProjectCard));
