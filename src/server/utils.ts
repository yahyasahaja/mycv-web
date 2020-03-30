import { RouteConfig } from 'react-router-config';

export const generateStaticRoutes = (routes: RouteConfig[]): string[] => {
  let staticRoutes: string[] = [];

  for (const route of routes) {
    if (typeof route.path === 'string') {
      staticRoutes.push(route.path);
    } else if (route.routes) {
      staticRoutes = [...staticRoutes, ...generateStaticRoutes(route.routes)];
    }
  }

  return staticRoutes;
};
