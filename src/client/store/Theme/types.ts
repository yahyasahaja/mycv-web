import { THEME_LIGHT, THEME_DARK } from '../../theme';

//VALUE
export type THEME_VALUE = typeof THEME_LIGHT | typeof THEME_DARK;

//STATE
export interface ThemeState {
  theme: THEME_VALUE;
}

//ACTION TYPES
export const SET_THEME = 'SET_THEME';
export const TOGGLE_THEME = 'TOGGLE_THEME';

export interface SetThemeAction {
  type: typeof SET_THEME;
  payload: THEME_VALUE;
}

export interface ToggleThemeAction {
  type: typeof TOGGLE_THEME;
}

export type ThemeActionTypes = SetThemeAction | ToggleThemeAction;
