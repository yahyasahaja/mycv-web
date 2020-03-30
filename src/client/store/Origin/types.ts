//STATE
export interface OriginState {
  origin: string;
}

//ACTION TYPES
export const SET_ORIGIN = 'SET_ORIGIN';

export interface SetOriginAction {
  type: typeof SET_ORIGIN;
  origin: string;
}

export type OriginActionTypes = SetOriginAction;
