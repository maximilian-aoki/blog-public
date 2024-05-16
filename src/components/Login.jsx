import { useLoaderData } from 'react-router-dom';

export default function Login() {
  const data = useLoaderData();
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl text-white font-bold">Login Page</h2>
    </div>
  );
}
