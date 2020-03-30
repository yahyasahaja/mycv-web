import { SET_ORIGIN, OriginActionTypes, OriginState } from './types';
import { hasWindow } from '../../utils';

const initialState: OriginState = {
  origin: hasWindow() ? window.location.href : '',
};

export const originReducer = (
  state = initialState,
  action: OriginActionTypes
): OriginState => {
  switch (action.type) {
    case SET_ORIGIN:
      return {
        ...state,
        origin: action.origin,
      };
    default:
      return state;
  }
};
