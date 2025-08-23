'use client';
import React, { useEffect, useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { access } from '../Access';

const token = await access();

async function feed(token, obj) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length));
  let randomSearch = '';
  let getRandomOffset = Math.floor(Math.random() * 999);


  switch (Math.round(Math.random() * 2)) {
    case 0:
      randomSearch = randomCharacter + '%25';
      break;
    case 1:
      randomSearch = '%25' + randomCharacter + '%25';
      break;
    case 2:
      randomSearch = '%25' + randomCharacter;
      break;
  }

  let url = `https://api.spotify.com/v1/search?query=${randomSearch}&offset=${getRandomOffset}&limit=1&type=${obj}&market=NL`;

  const result = fetch(url, {
    headers: { 'Authorization': "Bearer " + token }
  }).then(data => {
    return data.json()
  }).then(response => {
    if (obj === "artist") {
      return response.artists.items[0];
    } else if (obj === "album") {
      return response.albums.items[0];
    }
  })
  return result;
}



function FeedPagina() {
  const [feedAlbum, setFeedAlbum] = useState([]);
  const [feedArtist, setFeedArtist] = useState([]);

  const handleScroll = async () => {
    const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight

    if (bottom) {
      const albums = await feed(token, "album");
      setFeedAlbum(oldArray => [...oldArray, albums]);
    }
  };

  async function fetchToken() {
    const artists = await feed(token, "artist");
    const albums = await feed(token, "album");
    if (!artists || !albums) {
      console.error("Failed to fetch artists or albums");
      return;
    }
    console.log(albums);
    setFeedArtist(oldArray => [...oldArray, artists]);
    setFeedAlbum(oldArray => [...oldArray, albums]);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {
      passive: true
    })
    fetchToken();
  }, []);

  return (
    <main>
      {feedAlbum ? (
        <pre>
          <div className="feed-container">
            {feedAlbum.map(album => (
              <div className="post" key={album.id}>
                <Link to={`/album/${album.id}`}>
                  <img src={album.images[0]?.url} alt={album.name} />
                </Link>
                <div className="descricao">
                  <Link to={`/album/${album.id}`}>
                    <div className="info">
                      <h1>{album.name}</h1>
                      <div className="infos"><p>Artistas: </p>{album.artists.map(artist => artist.name).join(", ")}</div>
                      <div className="infos"><p>Musicas: </p>{album.total_tracks}</div>
                      <div className="infos"><p>Tipo: </p>{album.album_type}</div>
                      <div className="infos"><p>Lançamento(A/M/D): </p>{album.release_date.replace(/-/g, "/")}</div>
                    </div>
                  </Link>
                  <div className="acoes">
                    <button>Curtir</button>
                    <button>Compartilhar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </pre>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}

export default FeedPagina;