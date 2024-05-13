import { useLoaderData } from 'react-router-dom';

export default function AllPosts() {
  const data = useLoaderData();
  return (
    <>
      <h1>All Posts</h1>
    </>
  );
}
