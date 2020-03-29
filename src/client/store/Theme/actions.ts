import {
  SET_THEME,
  THEME_VALUE,
  SetThemeAction,
  TOGGLE_THEME,
  ToggleThemeAction,
} from './types';

export const setTheme = (theme: THEME_VALUE): SetThemeAction => {
  return {
    type: SET_THEME,
    payload: theme,
  };
};

export const toggleTheme = (): ToggleThemeAction => {
  return {
    type: TOGGLE_THEME,
  };
};
