import { Store } from 'redux';
import { createNewStore } from '../client/store';
import {
  fetchPostsAction,
  fetchPostAction,
} from '../client/store/Post/actions';

class StoreFactory {
  private static instance: StoreFactory;
  public store: Store;

  constructor() {
    this.store = createNewStore();
  }

  public fetchPosts = async () => {
    await this.store.dispatch<any>(fetchPostsAction());
  };

  public fetchPost = async (id: string) => {
    await this.store.dispatch<any>(fetchPostAction(id));
  };

  public static getInstance(): StoreFactory {
    if (!this.instance) {
      this.instance = new StoreFactory();
    }

    return this.instance;
  }
}

export default StoreFactory;
