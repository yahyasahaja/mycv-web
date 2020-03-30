// import React from 'react';
import { generateAsyncComponent } from './components/AsyncComponent';
import { RouteConfig } from 'react-router-config';
import { PATHS } from './config';
// import { Redirect } from 'react-router-dom';

// ROUTERS
const Home = generateAsyncComponent(() =>
  import(/* webpackChunkName: "Home" */ './screens/Home')
);

const Post = generateAsyncComponent(() =>
  import(/* webpackChunkName: "Post" */ './screens/Post')
);

const Routers: RouteConfig[] = [
  {
    component: Home,
    path: PATHS.HOME,
  },
  {
    component: Post,
    path: PATHS.POST,
  },
  // {
  //   // eslint-disable-next-line react/display-name
  //   component: () => <Redirect from="/" to={PATHS.HOME} />,
  //   path: '/',
  // },
];

export default Routers;
