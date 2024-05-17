import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();

  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const [formLoading, setFormLoading] = useState(false);
  const [signupError, setSignupError] = useState('');

  function handleNameChange(e) {
    setNameInput(e.target.value);
  }

  function handleEmailChange(e) {
    setEmailInput(e.target.value);
  }

  function handlePasswordChange(e) {
    setPasswordInput(e.target.value);
  }

  function handleSignupSubmit(e) {
    e.preventDefault();
    setFormLoading(true);
    setSignupError('');

    async function sendSignupPost() {
      try {
        const response = await fetch(
          `https://blog-api-maximilian.fly.dev/api/public/sign-up`,
          {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              fullName: nameInput,
              email: emailInput,
              password: passwordInput,
            }),
          },
        );

        const data = await response.json();
        console.log(data);

        if (data.error) {
          setFormLoading(false);
          setSignupError(data.error);
          return;
        }

        setFormLoading(false);
        setSignupError('');
        navigate('/log-in');
      } catch (err) {
        console.log(err);
        setFormLoading(false);
        setSignupError('something went wrong');
      }
    }

    sendSignupPost();
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl text-white font-bold">Signup Page</h2>
      <form
        onSubmit={handleSignupSubmit}
        className="rounded bg-dutch shadow p-4 flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="italic text-olive">
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="p-2 rounded shadow-inner"
            value={nameInput}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="italic text-olive">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="p-2 rounded shadow-inner"
            value={emailInput}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="italic text-olive">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="p-2 rounded shadow-inner"
            value={passwordInput}
            onChange={handlePasswordChange}
            minLength={6}
            required
          />
        </div>
        <input
          type="submit"
          value="Signup"
          className="rounded p-4 font-bold bg-true text-white hover:cursor-pointer mt-2"
        />
      </form>
      {formLoading && (
        <p className="text-dutch font-bold italic">
          checking action with server..
        </p>
      )}
      {signupError !== '' && (
        <p className="text-flame font-bold italic">{signupError}</p>
      )}
    </div>
  );
}
