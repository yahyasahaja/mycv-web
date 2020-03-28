import { matchRoutes, RouteConfig } from 'react-router-config';
import { AsyncComponentWrapper } from './components/AsyncComponent';

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
