import { hot } from 'react-hot-loader';
import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faGoogle,
} from '@fortawesome/free-brands-svg-icons';
import ProjectDetailsSkeleton from '../../components/ProjectDetailsSkeleton';
import { fetchPostAction } from '../../store/Post/actions';
import { RouteComponentProps } from 'react-router-dom';
import { backgroundImage } from '../../theme';
import { useWindow } from '../../utils';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  display: block;
  width: 100%;
  padding: 100px 0;
  min-height: 100vh;
  background: ${backgroundImage};

  .not-found {
    font-size: 20pt;
    font-weight: 100;
    text-align: center;
  }

  .close {
    position: fixed;
    top: 20px;
    right: 30px;
    font-size: 3rem;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      transform: scale(1.5);
    }

    &:active {
      transform: scale(1.1);
      opacity: 0.5;
      transition: 0.1s;
    }
  }

  .wrapper {
    max-width: 700px;
    width: 80%;
    margin: auto;

    .title {
      margin-bottom: 100px;
      text-align: center;
      font-size: 30pt;
      font-weight: 300;
      text-transform: capitalize;
    }
    .content {
      display: block;
      font-size: 14pt;
      font-weight: 300;
      line-height: 2;

      img {
        max-width: 100%;
        border-radius: 15px;
        height: auto;
      }

      a,
      a:visited {
        font-weight: 500;
        color: #47bc9b;
        border-bottom: dashed 1px;
        margin: 0 !important;
        &:hover {
          border-bottom-style: solid;
        }
      }
    }
  }
  .share {
    display: flex;
    flex-direction: column;
    position: fixed;
    justify-content: center;
    top: 30%;
    right: 10%;

    @media only screen and (max-width: 1000px) {
      flex-direction: row;
      position: relative;
      width: 100%;
      right: 0;
    }

    a {
      display: flex;
      width: 50px;
      height: 50px;
      justify-content: center;
      align-items: center;
      border: #19bc9c solid 1px;
      margin: 5px;
      border-radius: 50px;
      text-decoration: none !important;
      transition: 0.3s;
      font-size: 18px;
      color: #19bc9c;
    }
    a:hover {
      color: white;
    }

    .social-media-button {
      &:active {
        transition: 0.03s;
        opacity: 0.3;
      }
    }
    .fb:hover {
      background: #003ac1;
      border-color: #003ac1;
      transition: 0.3s;
    }
    .tw:hover {
      background: #19cdd0;
      border-color: #19cdd0;
      transition: 0.3s;
    }
    .gp:hover {
      background: #ab2323;
      border-color: #ab2323;
      transition: 0.3s;
    }
  }
`;

type ParamsType = {
  id: string;
};

export type PathParamsType = {
  prevPath: string;
};

const Post = (props: RouteComponentProps<ParamsType, any, PathParamsType>) => {
  const postState = useSelector((state: RootState) => state.postState);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchPostAction(props.match.params.id));
    const scrollTo = useWindow('scrollTo');
    if (scrollTo) scrollTo(0, 0);
  }, []);

  function renderContent() {
    if (postState.isFetchingPost) return <ProjectDetailsSkeleton />;
    if (!postState.post) return <div className="not-found">Not Found</div>;
    const link = `${window.location.href}`;

    return (
      <>
        <div className="share">
          <a
            className="social-media-button fb"
            href={`https://www.facebook.com/sharer.php?u=${link}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a
            className="social-media-button tw"
            href={`https://twitter.com/intent/tweet?url=${link}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a
            className="social-media-button gp"
            href={`https://plus.google.com/share?url=${link}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGoogle} />
          </a>
        </div>

        <div className="wrapper">
          <h1 className="title">{postState.post.title}</h1>
          <p
            className="content"
            dangerouslySetInnerHTML={{ __html: postState.post.content }}
          />
        </div>
      </>
    );
  }

  return (
    <Container>
      <div
        className="close"
        onClick={() => {
          const prevPath = props.location.state?.prevPath;
          if (prevPath) {
            props.history.replace(prevPath);
          } else props.history.goBack();
        }}
      >
        <FontAwesomeIcon icon={faTimes} />
      </div>
      {renderContent()}
    </Container>
  );
};

export default hot(module)(Post);
