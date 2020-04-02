import { Application, Request, NextFunction } from 'express';
import { PATHS } from '../client/config';
import StoreFactory from './StoreFactory';
import { Store } from 'redux';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      store: Store;
    }
  }
}

export const setupAPIMiddleware = (app: Application) => {
  app.use((req: Request, res: any, next: NextFunction) => {
    StoreFactory.getInstance().recreateStore();
    req.store = StoreFactory.getInstance().store as Store;
    next();
  })

  app.use(PATHS.HOME, async (req: Request, res: any, next: NextFunction) => {
    const store = StoreFactory.getInstance();
    await store.fetchPosts();
    next();
  });

  app.use(PATHS.POST, async (req: Request, res: any, next: NextFunction) => {
    const store = StoreFactory.getInstance();
    await store.fetchPost(req.params.id);
    next();
  });
};
