// React Router v7 ではこのファイル名指定

import { type RouteConfig, index, route } from '@react-router/dev/routes';

// React Router v7 のルーティング定義
export default [
  index('./routes/_index.tsx'),
  route('about', './routes/about.tsx')
] satisfies RouteConfig;
