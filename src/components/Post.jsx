import { useOutletContext } from 'react-router-dom';

import Comments from './Comments';
import PostOnly from './PostOnly';

export default function Post() {
  const { token } = useOutletContext();

  return (
    <div>
      <PostOnly />
      <hr className="border-white mb-2" />
      <Comments token={token} />
    </div>
  );
}
