import * as React from 'react';
import * as ReactDOM from 'react-dom';

import dotenv from 'dotenv'
dotenv.config()

const { useState, useEffect, useRef } = React;
const clientID = process.env.CLIENT_ID;
const baseUrl = process.env.BASE_URL;

const App = () => {
  const queryInput = useRef();
  let [photos, setPhotos] = useState([]);

  const numberOfPhotos = 20;
  const url = `${baseUrl}?count=${numberOfPhotos}&client_id=${clientID}`;

  const searchPhotos = (e) => {
    e.preventDefault();
    const query = queryInput.current.value;
    const photosUrl = query ? `${url}&query=${query}` : url;
    fetch(photosUrl)
    .then(res => res.json())
    .then(data => {
      return setPhotos(data)
    });
  };

  return (
    <div className="box">
      <form id="unsplash" className="unsplash-form" onSubmit={searchPhotos}>
        <label htmlFor="search">Search Photos on Unsplash</label> 
        <input
          ref={queryInput}
          placeholder="Enter..."
          type="search"
          id="search"
          className="search-input"
          defaultValue=""
          style={{ margin: '0 0 20px 5px' }}
          autoFocus
        />
        <button 
          type="submit"
          className="submit-button"
        >Submit
        </button>
      </form>

      <ul className="photo-grid">
        {photos.map(photo => {
          return (
            <li key={photo.id}>
              <a href={photo.urls.full} target="_blank">
                <img src={photo.urls.regular} />
              </a>
            </li>
          );
        })}
      </ul>

    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));