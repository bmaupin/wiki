import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('routes/redirect.tsx'),
  route('wiki/*', 'docs/page.tsx'),
  route('api/search', 'docs/search.ts'),
] satisfies RouteConfig;
