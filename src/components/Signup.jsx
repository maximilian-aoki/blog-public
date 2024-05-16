import { useLoaderData } from 'react-router-dom';

export default function Signup() {
  const data = useLoaderData();
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl text-white font-bold">Signup Page</h2>
    </div>
  );
}
