import { ThunkAction } from 'redux-thunk';
import { RootState } from '../index';
import {
  SET_POST,
  SET_POSTS,
  SET_FETCHING_STATE,
  PostActionTypes,
  Post,
  PostMap,
} from './types';
import { fetchPost, fetchPosts } from '../../repository';
import localforage from 'localforage';
import { LOCAL_POST_MAP_URI } from '../../config';
import { hasWindow, truncateText, processPost } from '../../utils';

export type PostsThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  PostActionTypes
>;

export const setPost = (post: Post): PostActionTypes => {
  return {
    type: SET_POST,
    post,
  };
};

export const setPosts = (posts: Post[]): PostActionTypes => {
  return {
    type: SET_POSTS,
    posts,
  };
};

export const fetchPostsAction = (): PostsThunk => async (dispatch) => {
  try {
    dispatch({
      type: SET_FETCHING_STATE,
      payload: {
        isFetchingPosts: true,
      },
    });

    const { data } = await fetchPosts();

    const posts: Post[] = (data as Post[]).map(processPost);

    dispatch(setPosts(posts));
  } catch (err) {
    console.log('ERROR WHILE FETCHING POSTS', err);
  } finally {
    dispatch({
      type: SET_FETCHING_STATE,
      payload: {
        isFetchingPosts: false,
      },
    });
  }
};

const getPostMapFromLocal = async () => {
  const postMap: PostMap = await localforage.getItem(LOCAL_POST_MAP_URI);
  if (postMap) return postMap;
  const newMap = {};
  await localforage.setItem(LOCAL_POST_MAP_URI, newMap);
  return newMap;
};

const getPostFromLocal = async (id: string) => {
  const postMap = await getPostMapFromLocal();
  if (postMap) {
    return postMap[id];
  }
};

const setPostMapToLocal = async (postMap: PostMap) => {
  await localforage.setItem(LOCAL_POST_MAP_URI, postMap);
};

const setPostToLocal = async (post: Post) => {
  const postMap: PostMap = await getPostMapFromLocal();
  postMap[post.id] = post;
  setPostMapToLocal(postMap);
};

export const fetchPostAction = (id: string): PostsThunk => async (
  dispatch,
  getState
) => {
  try {
    const postFromLocal = hasWindow() ? await getPostFromLocal(id) : null;
    const postState = getState().postState;

    if (postFromLocal) {
      dispatch(setPost(postFromLocal));
    }

    if (!postState.post) {
      dispatch({
        type: SET_FETCHING_STATE,
        payload: {
          isFetchingPost: true,
        },
      });
    }

    const { data } = await fetchPost(id);

    const post = processPost(data as Post);

    if (hasWindow()) await setPostToLocal(post);
    dispatch(setPost(post));
  } catch (err) {
    console.log('ERROR WHILE FETCHING POST', err);
  } finally {
    dispatch({
      type: SET_FETCHING_STATE,
      payload: {
        isFetchingPost: false,
      },
    });
  }
};
