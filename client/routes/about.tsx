import { Link } from 'react-router';

import type { Route } from './+types/about';

export async function clientLoader(_: Route.ClientLoaderArgs) {
  const response = await fetch('/api');
  const json = await response.json();
  const text = JSON.stringify(json);
  // NOTE : `throw new Error('Error')` のようにエラーが起こると `ErrorBoundary` に移動する
  return text;
}

export default function About({ loaderData }: Route.ComponentProps): React.ReactElement {
  return (
    <div>
      <h1>About</h1>
      <p>{loaderData}</p>
      <p>
        <button onClick={() => {
          fetch('/api')
            .then(res => res.json())
            .then(json => alert(JSON.stringify(json)))
            .catch(error => alert(`ERROR : ${error.toString()}`));
        }}>Button</button>
      </p>
      <p>
        <Link to="/">Index</Link>
      </p>
    </div>
  );
}
