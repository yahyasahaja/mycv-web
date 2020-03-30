import { combineReducers } from 'redux';
import { postReducer } from './Post/reducers';
import { themeReducer } from './Theme/reducers';
import { originReducer } from './Origin/reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export const rootReducer = combineReducers({
  themeState: themeReducer,
  postState: postReducer,
  originState: originReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const createNewStore = (preloadedState?: RootState) => {
  if (preloadedState) {
    return createStore(rootReducer, preloadedState, applyMiddleware(thunk));
  }
  return createStore(rootReducer, applyMiddleware(thunk));
};
