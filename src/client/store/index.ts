import { combineReducers } from 'redux';
import { postReducer } from './Post/reducers';
import { themeReducer } from './Theme/reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export const rootReducer = combineReducers({
  themeState: themeReducer,
  postState: postReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
