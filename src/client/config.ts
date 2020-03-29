import {
  faGithub,
  faGitlab,
  faLinkedin,
  faInstagram,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';
export const BASE_URL: string = 'https://api.cv.ngopi.men';
export const COLORS = {
  primary: '#3498db',
  secondary: '#e74c3c',
  clouds: '#ecf0f1',
  background: '#f6f7f9',
};
export const LOCAL_POST_MAP_URI: string = 'postmapyahya';
export const PATHS = {
  HOME: '/home',
  POST: '/posts/:id',
};

export default {
  BASE_URL,
  COLORS,
  LOCAL_POST_MAP_URI,
  PATHS,
};

export const SOCIAL_MEDIA = [
  {
    icon: faLinkedin,
    link: 'https://linkedin.com/in/yahyasahaja',
  },
  {
    icon: faGithub,
    link: 'https://github.com/yahyasahaja',
  },
  {
    icon: faGitlab,
    link: 'https://gitlab.com/yahyasahaja',
  },
  {
    icon: faFacebook,
    link: 'https://facebook.com/yahyasahaja5',
  },
  {
    icon: faInstagram,
    link: 'https://instagram.com/yahyasahaja',
  },
];

export const ABOUT_TEXT =
  'Hello, my name is YahyaSahaja, 21 years old student that wants to make a ' +
  'positive impact for people around the world.';
