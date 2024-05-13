import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [body, setBody] = useState('');

  async function sendRequest(url, method, body) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/${url.toLowerCase()}`,
        {
          method: method,
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: ['POST', 'PUT'].includes(method)
            ? JSON.stringify({ message: body })
            : null,
        },
      );

      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log('error in request');
      console.log(err);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendRequest(url, method, body);
  }

  function handleUrlChange(e) {
    setUrl(e.target.value);
  }

  function handleMethodChange(e) {
    setMethod(e.target.value);
  }

  function handleBodyChange(e) {
    setBody(e.target.value);
  }

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <label htmlFor="url">URL</label>
          <input type="text" id="url" value={url} onChange={handleUrlChange} />
          <select value={method} onChange={handleMethodChange}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
          <label htmlFor="body">JSON BODY:</label>
          <input
            type="text"
            id="body"
            value={body}
            onChange={handleBodyChange}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
      <p className="read-the-docs">Hello World!</p>
    </>
  );
}

export default App;
