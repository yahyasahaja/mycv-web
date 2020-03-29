import { SET_THEME, ThemeState, ThemeActionTypes, TOGGLE_THEME } from './types';
import { THEME_DARK, THEME_LIGHT } from '../../theme';

const initialState: ThemeState = {
  theme: THEME_DARK,
};

export const themeReducer = (
  state = initialState,
  action: ThemeActionTypes
): ThemeState => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    case TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === THEME_DARK ? THEME_LIGHT : THEME_DARK,
      };
    default:
      return state;
  }
};
