import localforage from 'localforage';
import { IMAGE_URL } from './config';
import { matchRoutes, RouteConfig } from 'react-router-config';
import { AsyncComponentWrapper } from './components/AsyncComponent';

declare global {
  interface Window {
    utils: {
      calculateCatchPokemon: any;
      localforage: any;
    };
  }
}
export const generateImageUrlByUrl = (url: string): string => {
  const splittedUrl = url.split('/');
  const id =
    splittedUrl[splittedUrl.length - 1] || splittedUrl[splittedUrl.length - 2];
  return `${IMAGE_URL}/${id}.png`;
};
export const generateImageUrlById = (id: number): string => {
  return `${IMAGE_URL}/${id}.png`;
};

export const utils = {
  calculateCatchPokemon: () => Math.random() < 0.5,
  localforage,
};

export const convertDashedToReadable = (dashedString: string): string => {
  return dashedString.replace(/-/g, ' ');
};

export const ensureReady = (routeConfig: RouteConfig[], location?: string) => {
  const matches = matchRoutes(
    routeConfig,
    location || window.location.pathname
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

if (typeof window !== 'undefined') {
  if (window) (window as Window).utils = utils;
}
