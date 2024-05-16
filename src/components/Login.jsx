import { useOutletContext } from 'react-router-dom';

export default function Login() {
  const { handleLoginSuccess } = useOutletContext();

  function handleLoginSubmit(e) {
    e.preventDefault();
    console.log('trying to login');
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl text-white font-bold">Login Page</h2>
      <form onSubmit={handleLoginSubmit}>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
