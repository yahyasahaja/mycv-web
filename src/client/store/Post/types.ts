//STATE
export interface Post {
  id: string;
  image_url: string;
  title: string;
  content: string;
}

export interface PostMap {
  [id: string]: Post;
}

export interface PostFetchingState {
  isFetchingPosts?: boolean;
  isFetchingPost?: boolean;
}

export interface PostState extends PostFetchingState {
  posts: Post[];
  post: Post | null;
}

//ACTION TYPES
export const SET_POST = 'SET_POST';
export const SET_POSTS = 'SET_POSTS';
export const SET_FETCHING_STATE = 'SET_IS_FETCHING';

export interface SetPostAction {
  type: typeof SET_POST;
  post: Post;
}

export interface SetPostsAction {
  type: typeof SET_POSTS;
  posts: Post[];
}

export interface SetIsFetchingStateAction {
  type: typeof SET_FETCHING_STATE;
  payload: PostFetchingState;
}

export type PostActionTypes =
  | SetPostAction
  | SetPostsAction
  | SetIsFetchingStateAction;
