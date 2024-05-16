import { useLocation } from 'react-router-dom';
import { fetchInitialData } from '../utils/fetchUtils';
import { DateTime } from 'luxon';

export default function Comments({ token }) {
  const location = useLocation();
  const { data, error, loading } = fetchInitialData(
    `${location.pathname}/comments`,
    'GET',
    null,
  );

  if (data && data.error === 'could not find resource') {
    return <Navigate to={'/error'} />;
  }

  return (
    <>
      {loading && <p>loading comments...</p>}
      {error && <p>network error - try again </p>}
      {data && (
        <>
          <h2 className="text-lg mb-2 text-white font-bold">Comments</h2>
          <ul className="flex flex-col gap-2">
            {token && (
              <li className="p-2 bg-true rounded shadow text-white">
                share your thoughts:
              </li>
            )}
            {data.allComments.map((comment) => {
              console.log(typeof comment.createdAt);
              return (
                <li
                  key={comment._id}
                  className="p-2 bg-olive rounded shadow text-white flex flex-col"
                >
                  <p>{comment.text}</p>
                  <p className="text-sm italic text-gray-300 text-end">
                    {comment.author.fullName} -{' '}
                    {DateTime.fromISO(comment.createdAt).toLocaleString(
                      DateTime.DATE_MED,
                    )}
                  </p>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
}
