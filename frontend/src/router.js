import React from 'react';
import UniversalRouter from 'universal-router';

import NotFound from './pages/notFound';

import Dashboard from './pages/dashboard';
import Packages  from './pages/packages';
import Hosts     from './pages/hosts';
import Deploy    from './pages/deploy';

const routes = [
  {
    path: '/hosts',
    render: (_, data) => ({
      component: (
        <Hosts />
      ),
    })
  },
  {
    path: '/pkgs',
    render: (_, data) => ({
      component: (
        <Packages />
      ),
    })
  },
  {
    path: '/deploy',
    render: (_, data) => ({
      component: (
        <Deploy />
      ),
    })
  },
  {
    path: '/',
    render: (_, data) => ({
      component: (
        <Dashboard />
      ),
    })
  },
];

function resolveRoute(ctx) {
  const { route, params, fetchQuery, next } = ctx;

  // Allow to load routes on demand
  if (typeof route.children === 'function') {
    return route.children().then(x => {
      route.children = x.default;
      return next();
    });
  }

  if (!route.render) {
   return next();
  }

  // Start fetching data from GraphQL API
  const variables = route.variables ? route.variables(params, ctx) : params;
  const dataPromise = route.query ? fetchQuery(route.query, variables) : null;

  // Start downloading missing JavaScript chunks
  const componentsPromise = route.components
    ? route.components().map(x => x.then(x => x.default))
    : [];
  return Promise.all([...componentsPromise, dataPromise]).then(components => {
    const data = components.pop();
    const result = route.render(components, data, { ...ctx, variables });
    return result ? { ...result, data } : next();
  });
}

function errorHandler(error) {
  return { 
    component: <NotFound />,
   }
}

export default new UniversalRouter(routes, {
  resolveRoute,
  errorHandler,
});