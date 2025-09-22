import { Link } from 'react-router';

export default function Index(): React.ReactElement {
  return (
    <div>
      <h1>Index</h1>
      <p>
        <Link to="/about">About</Link>
      </p>
    </div>
  );
}
