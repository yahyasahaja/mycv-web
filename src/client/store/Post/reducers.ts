import {
  SET_POSTS,
  SET_POST,
  SET_FETCHING_STATE,
  PostActionTypes,
  PostState,
} from './types';

const initialState: PostState = {
  isFetchingPost: false,
  isFetchingPosts: false,
  post: null,
  posts: [],
};

export const postReducer = (
  state = initialState,
  action: PostActionTypes
): PostState => {
  switch (action.type) {
    case SET_POST:
      return {
        ...state,
        post: action.post,
      };
    case SET_POSTS:
      return {
        ...state,
        posts: action.posts,
      };
    case SET_FETCHING_STATE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
