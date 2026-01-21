import { index, route, type RouteConfig } from '@react-router/dev/routes';

const routes: RouteConfig = [
  route('wiki/*', 'docs/page.tsx'),
  route('wiki/api/search', 'docs/search.ts'),
];

// Only serve these routes when doing local development
if (import.meta.env.DEV) {
  // Does a server-side redirect
  routes.unshift(index('routes/redirect.tsx'));
}

export default routes;
