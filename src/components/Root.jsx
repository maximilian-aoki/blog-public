import { Link, Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <div className="bg-slate-700">
      <header>
        <h1>header</h1>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>footer</p>
      </footer>
    </div>
  );
}
