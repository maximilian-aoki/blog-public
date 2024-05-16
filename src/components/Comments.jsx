import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchInitialData } from '../utils/fetchUtils';
import { DateTime } from 'luxon';

export default function Comments({ token, onRemount }) {
  // get initial load data based on url
  const location = useLocation();
  const { data, error, loading } = fetchInitialData(
    `${location.pathname}/comments`,
    'GET',
    null,
  );

  // if url is malformed
  if (data && data.error === 'could not find resource') {
    return <Navigate to={'/error'} />;
  }

  // interactive state
  const [formLoading, setFormLoading] = useState(false);

  const [addCommentText, setAddCommentText] = useState('');
  const [addCommentError, setAddCommentError] = useState('');

  function handleAddCommentChange(e) {
    setAddCommentText(e.target.value);
  }

  // handle create/update/delete comments
  function handleAddComment(e) {
    e.preventDefault();
    setFormLoading(true);
    setAddCommentError('');

    async function sendCommentPost() {
      try {
        const response = await fetch(
          `https://blog-api-maximilian.fly.dev/api/public/${location.pathname}/comments`,
          {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify({ text: addCommentText }),
          },
        );

        const data = await response.json();
        console.log(data);

        if (
          data.error.name === 'JsonWebTokenError' ||
          data.error === 'error parsing Bearer Token'
        ) {
          setFormLoading(false);
          setAddCommentError('action not authorized');
          return;
        }

        setFormLoading(false);
        setAddCommentError('');
      } catch (err) {
        console.log(err);
        setFormLoading(false);
        setAddCommentError('something went wrong');
      }
    }

    sendCommentPost();
    // onRemount();
  }

  function handleEditComment(e) {
    e.preventDefault();
    onRemount();
  }

  function handleDeleteComment(e) {
    e.preventDefault();
    onRemount();
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
              <li className="p-2 bg-true rounded shadow text-white italic flex flex-col gap-2">
                <p>share your thoughts:</p>
                <form
                  onSubmit={handleAddComment}
                  className="flex flex-col gap-2"
                >
                  <textarea
                    className="rounded border-2 shadow-inner resize-none p-2 text-olive"
                    value={addCommentText}
                    onChange={handleAddCommentChange}
                    required
                  />
                  <input
                    type="submit"
                    value="Add Comment"
                    className="rounded bg-dutch py-2 text-olive font-bold hover:cursor-pointer"
                  />
                </form>
              </li>
            )}
            {formLoading && (
              <li className="text-dutch font-bold italic">
                checking action with server..
              </li>
            )}
            {addCommentError !== '' && (
              <li className="text-flame font-bold italic">{addCommentError}</li>
            )}
            {data.allComments.map((comment) => {
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
