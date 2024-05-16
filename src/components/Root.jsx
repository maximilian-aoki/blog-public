import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

let localToken = localStorage.getItem('jwt');
localToken = localToken ? localToken : null;

export default function Root() {
  const [token, setToken] = useState(localToken);
  console.log(token); // debugging token

  const navigate = useNavigate();

  function handleLogin(token) {
    localStorage.setItem('jwt', token);
    setToken(token);

    navigate('/', { replace: true });
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    setToken(null);

    navigate('/', { replace: true });
  }

  return (
    <div className="bg-battleship h-screen flex flex-col">
      <header className="bg-olive flex-none h-auto p-6 flex flex-col gap-4 text-white items-center">
        <h1 className="text-4xl font-bold">MAXY BLOG</h1>
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
                  <button onClick={() => handleLogin('hello!')}>Log In</button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main className="flex-1 p-6 bg-battleship">
        <Outlet context={{ token }} />
      </main>
      <footer className="bg-true flex-none p-6 grid place-content-center">
        <p className="text-white font-bold">2024 Copyright Maximilian Aoki</p>
      </footer>
    </div>
  );
}
