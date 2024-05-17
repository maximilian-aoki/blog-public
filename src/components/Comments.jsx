import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
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

  // get user data from outlet context
  const { user } = useOutletContext();

  // if url is malformed
  if (data && data.error === 'could not find resource') {
    return <Navigate to={'/error'} />;
  }

  // interactive state
  const [formLoading, setFormLoading] = useState(false);

  const [addCommentText, setAddCommentText] = useState('');
  const [commentError, setCommentError] = useState('');

  function handleAddCommentChange(e) {
    setAddCommentText(e.target.value);
  }

  // handle create/update/delete comments

  function handleAddComment(e) {
    e.preventDefault();
    setFormLoading(true);
    setCommentError('');

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
              Authorization: `Bearer ${localStorage.getItem('public-jwt')}`,
            },
            body: JSON.stringify({ text: addCommentText }),
          },
        );

        const data = await response.json();
        console.log(data);

        if (data.error) {
          if (
            data.error.name === 'JsonWebTokenError' ||
            data.error === 'error parsing Bearer Token'
          ) {
            setFormLoading(false);
            setCommentError('action not authorized');
            return;
          }
        }

        setFormLoading(false);
        setCommentError('');
        onRemount();
      } catch (err) {
        console.log(err);
        setFormLoading(false);
        setCommentError('something went wrong');
      }
    }

    sendCommentPost();
  }

  function handleEditComment(e) {
    e.preventDefault();
    onRemount();
  }

  function handleDeleteComment(e) {
    e.preventDefault();
    setFormLoading(true);
    setCommentError('');

    async function sendCommentDelete() {
      try {
        const response = await fetch(
          `https://blog-api-maximilian.fly.dev/api/public/${location.pathname}/comments/${e.target.getAttribute('data-id')}/delete`,
          {
            method: 'DELETE',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${localStorage.getItem('public-jwt')}`,
            },
          },
        );

        const data = await response.json();
        console.log(data);

        if (data.error) {
          setFormLoading(false);
          setCommentError(data.error);
        }

        setFormLoading(false);
        setCommentError('');
        onRemount();
      } catch (err) {
        console.log(err);
        setFormLoading(false);
        setCommentError('something went wrong');
      }
    }

    sendCommentDelete();
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
            {commentError !== '' && (
              <li className="text-flame font-bold italic">{commentError}</li>
            )}
            {data.allComments.map((comment) => {
              return (
                <li
                  key={comment._id}
                  className="p-2 bg-olive rounded shadow text-white flex flex-col gap-1"
                >
                  <p>{comment.text}</p>
                  <p className="text-sm italic text-gray-300 text-end">
                    {comment.author.fullName} -{' '}
                    {DateTime.fromISO(comment.createdAt).toLocaleString(
                      DateTime.DATE_MED,
                    )}
                  </p>
                  {comment.author._id === user._id && (
                    <div className="flex gap-2 justify-end">
                      <button
                        className="rounded px-2 text-white bg-true"
                        data-id={comment._id}
                      >
                        Edit
                      </button>
                      <button
                        className="rounded px-2 text-white bg-flame"
                        data-id={comment._id}
                        onClick={handleDeleteComment}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
}
