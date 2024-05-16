import { useLoaderData } from 'react-router-dom';

export default function AllPosts() {
  const data = useLoaderData();
  return (
    <>
      <h2>All Posts</h2>
    </>
  );
}
