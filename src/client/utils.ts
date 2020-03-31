import { matchRoutes, RouteConfig } from 'react-router-config';
import { AsyncComponentWrapper } from './components/AsyncComponent';
import { Post } from './store/Post/types';

export const hasWindow = () => typeof window !== 'undefined';

export const useWindow = (windowProperty): any => {
  if (typeof window !== 'undefined') return window[windowProperty];
};

export const ensureReady = (routeConfig: RouteConfig[], location?: string) => {
  const matches = matchRoutes(
    routeConfig,
    location || useWindow('location')?.pathname
  );

  return Promise.all(
    matches.map((match) => {
      const { component } = match.route;
      const asyncComponent = component as AsyncComponentWrapper;
      if (asyncComponent && asyncComponent.load) {
        return asyncComponent.load();
      }
      return undefined;
    })
  );
};

export const truncateText = (text, K): string => {
  const words = text.split(' ');
  let counter = 0;
  for (let i = 0; i < words.length; i++) {
    const nextCounter = counter + words[i].length;
    if (K >= counter && K <= nextCounter) {
      return words.slice(0, i + (K === nextCounter ? 1 : 0)).join(' ');
    }
    counter = nextCounter + (words.length - 1 === i ? 0 : 1);
  }
  return words.trim();
};

export const processPost = (post: Post) => {
  const reg = /\ssrc=(?:(?:'([^']*)')|(?:"([^"]*)")|([^\s]*))/i;
  const imgs = reg.exec(post.content);
  let image_url;
  if (imgs) if (imgs.length > 0) image_url = imgs[1] || imgs[2] || imgs[3];
  const textContent = post.content.replace(/(<([^>]+)>)/gi, '');

  return {
    id: post.id,
    image_url,
    title: post.title,
    content: post.content,
    textContent,
    truncatedContent: truncateText(textContent, 20),
  };
};
