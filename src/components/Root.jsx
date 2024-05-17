import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

let localToken = localStorage.getItem('public-jwt');
let localUser = localStorage.getItem('public-user');
localToken = localToken ? localToken : null;
localUser = localUser ? JSON.parse(localUser) : null;

export default function Root() {
  const [token, setToken] = useState(localToken);
  const [user, setUser] = useState(localUser);

  const navigate = useNavigate();

  function handleLoginSuccess(token, user) {
    localStorage.setItem('public-jwt', token);
    localStorage.setItem('public-user', JSON.stringify(user));
    setToken(token);
    setUser(user);

    navigate('/', { replace: true });
  }

  function handleLogout() {
    localStorage.removeItem('public-jwt');
    localStorage.removeItem('public-user');
    setToken(null);
    setUser(null);

    navigate('/', { replace: true });
  }

  return (
    <div className="bg-battleship h-screen flex flex-col">
      <header className="bg-olive flex-none h-auto p-6 flex flex-col gap-4 text-white items-center">
        <h1 className="text-4xl font-bold">MAXY BLOG</h1>
        {user && (
          <p className="text-sm italic text-gray-400">
            Signed in as {user.name}
          </p>
        )}
        <nav className="">
          <ul className="flex gap-6">
            <li>
              <Link to="/">Home</Link>
            </li>
            {token ? (
              <li>
                <button onClick={handleLogout}>Log Out</button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/sign-up">Sign Up</Link>
                </li>
                <li>
                  <Link to="/log-in">Log In</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main className="flex-1 p-6 bg-battleship">
        <Outlet context={{ token, handleLoginSuccess, user }} />
      </main>
      <footer className="bg-true flex-none p-6 grid place-content-center">
        <p className="text-white font-bold">2024 Copyright Maximilian Aoki</p>
      </footer>
    </div>
  );
}
