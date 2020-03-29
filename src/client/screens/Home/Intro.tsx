import { hot } from 'react-hot-loader';
import React from 'react';
import styled from 'styled-components';
import FAIcon from '../../components/FAIcon';
import { SOCIAL_MEDIA, ABOUT_TEXT } from '../../config';
import { textColor, boxShadow } from '../../theme';
import Plx from 'react-plx';
import {
  aboutTitle,
  profilePhoto,
  aboutText,
  lineParallax,
} from './introParallaxData';

const Container = styled.div`
  display: block;

  .header {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .name {
      font-size: 50pt;
      font-weight: 500;
      text-align: center;
    }

    .headline {
      text-align: center;
      margin-top: 20px;
      font-size: 20pt;
      font-weight: 300;
    }

    .social-media {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
  }

  .title {
    font-size: 30pt;
    font-weight: 600;
    text-align: center;
    margin-bottom: 40px;
    padding-bottom: 20px;
  }

  .about {
    height: 100vh;
    position: relative;

    .about-content {
      display: flex;
      justify-content: center;
      align-items: center;

      .profile-photo {
        width: 200px;
        height: 200px;
        border-radius: 200px;
        overflow: hidden;
        box-shadow: ${boxShadow};
        border: 3px solid white;
        transform: translateX(-150%);
        opacity: 0;

        img {
          width: 100%;
        }
      }

      .desc {
        width: 400px;
        margin-left: 50px;
        margin-top: 0px;
        padding: 30px;
        border: 2px dashed ${textColor};
        border-radius: 20px;
        transform: translateX(150%);
        opacity: 0;

        .hand-wave {
          height: 41px;
          float: left;
          margin-right: 10px;

          img {
            height: 100%;
          }
        }
      }
    }

    .line-wrapper {
      display: flex;
      justify-content: center;
      position: absolute;
      bottom: 150px;
      width: 100%;

      .line-parallax {
        width: 80%;
        height: 5px;
        background-color: ${textColor};
        transform: scaleX(0);
      }
    }
  }
`;

const Intro = () => {
  return (
    <Container>
      <div className="header">
        <div className="name">Yahya Sahaja</div>
        <div className="headline">Software Engineer | Tech Enthusiast</div>
        <div className="social-media">
          {SOCIAL_MEDIA.map((socialMedia, i) => {
            return <FAIcon key={i} {...socialMedia} />;
          })}
        </div>
      </div>
      <div className="about">
        <Plx parallaxData={aboutTitle}>
          <div className="title">Welcome</div>
        </Plx>
        <div className="about-content">
          <Plx className="profile-photo" parallaxData={profilePhoto}>
            <img src="/images/myself.jpg" alt="profile" />
          </Plx>
          <Plx className="desc" parallaxData={aboutText}>
            <div className="hand-wave">
              <img src="/images/hand-wave.png" alt="hand-wave" />
            </div>
            {ABOUT_TEXT}
          </Plx>
        </div>
        <div className="line-wrapper">
          <Plx className="line-parallax" parallaxData={lineParallax} />
        </div>
      </div>
    </Container>
  );
};

export default hot(module)(Intro);
