import { useLoaderData } from 'react-router-dom';

export default function Post() {
  const data = useLoaderData();
  return (
    <>
      <h2>Individual Post Page</h2>
    </>
  );
}
