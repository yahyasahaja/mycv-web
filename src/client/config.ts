import { IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core';

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

type SocialMediaProp = {
  prefix: IconPrefix;
  icon: IconName;
  link: string;
};

export const SOCIAL_MEDIA: SocialMediaProp[] = [
  {
    prefix: 'fab',
    icon: 'linkedin',
    link: 'https://linkedin.com/in/yahyasahaja',
  },
  {
    prefix: 'fab',
    icon: 'github',
    link: 'https://github.com/yahyasahaja',
  },
  {
    prefix: 'fab',
    icon: 'gitlab',
    link: 'https://gitlab.com/yahyasahaja',
  },
  {
    prefix: 'fab',
    icon: 'facebook',
    link: 'https://facebook.com/yahyasahaja5',
  },
  {
    prefix: 'fab',
    icon: 'instagram',
    link: 'https://instagram.com/yahyasahaja',
  },
];

export const ABOUT_TEXT =
  'Hello, my name is YahyaSahaja, 21 years old student that wants to make a ' +
  'positive impact for people around the world.';
