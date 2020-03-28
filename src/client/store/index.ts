import { combineReducers } from 'redux';
import { postReducer } from './Post/reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export const rootReducer = combineReducers({
  postState: postReducer,
});

export const store = createStore(postReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
