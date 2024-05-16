import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import Comments from './Comments';
import PostOnly from './PostOnly';

export default function Post() {
  const { token } = useOutletContext();
  const [remountCommentsCount, setRemountCommentsCount] = useState(1);

  function handleRemountComments() {
    setRemountCommentsCount((state) => state + 1);
  }

  return (
    <div>
      <PostOnly />
      <hr className="border-white mb-2" />
      <Comments
        key={remountCommentsCount}
        token={token}
        onRemount={handleRemountComments}
      />
    </div>
  );
}
