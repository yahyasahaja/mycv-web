import theme from 'styled-theming';

export const MODE = 'mode';
export const LIGHT_COLOR = '#fafafa';
export const DARK_COLOR = '#333333';
export const THEME_LIGHT = 'light';
export const THEME_DARK = 'dark';

//COLORS
export const backgroundColor = theme(MODE, {
  [THEME_LIGHT]: LIGHT_COLOR,
  [THEME_DARK]: DARK_COLOR,
});

export const backgroundImage = theme(MODE, {
  [THEME_LIGHT]: 'url("/images/bg-light.png")',
  [THEME_DARK]: 'url("/images/bg-dark.png")',
});

export const textColor = theme(MODE, {
  [THEME_LIGHT]: DARK_COLOR,
  [THEME_DARK]: LIGHT_COLOR,
});

export const boxShadow = theme(MODE, {
  [THEME_LIGHT]: '0px 18px 40px 0px #929292',
  [THEME_DARK]: 'none',
});
