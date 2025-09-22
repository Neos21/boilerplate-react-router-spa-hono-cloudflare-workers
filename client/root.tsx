// React Router v7 ではこのファイル名指定

import { isRouteErrorResponse, Outlet, Scripts, ScrollRestoration } from 'react-router';

// NOTE : `$ npx react-router typegen` で `./.react-router/` 配下に型定義が出力される (開発時は自動的に出力される) コレを参照するのが `./+types/` という書き方 https://eiji.page/blog/react-router-dynamic-meta/
import type { Route } from './+types/root';

export function Layout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {children}
        {/* スクロール位置の復元用・`<Scripts />` の直前に置くこと https://react-router-docs-ja.techtalk.jp/api/components/ScrollRestoration */}
        <ScrollRestoration />
        {/* React のクライアントランタイムを置く・`</body>` の直前に置くこと https://react-router-docs-ja.techtalk.jp/api/components/Scripts */}
        <Scripts />
      </body>
    </html>
  );
}

export default function App(): React.ReactElement {
  return <Outlet />;
}

// コレがないとビルド後の `index.html` に `console.log` が仕込まれるため入れておく
export function HydrateFallback() {
  return <></>;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps): React.ReactElement {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined = undefined;
  
  if(isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
  }
  else if(import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }
  
  return (
    <div>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack ? <pre>{stack}</pre> : null}
    </div>
  );
}
