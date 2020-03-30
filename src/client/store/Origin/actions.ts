import { SET_ORIGIN, SetOriginAction } from './types';

export const setOrigin = (origin: string): SetOriginAction => {
  return {
    type: SET_ORIGIN,
    origin,
  };
};
