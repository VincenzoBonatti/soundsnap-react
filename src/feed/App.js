'use client';
import React, { useEffect, useState } from 'react';
import './App.css';
import "../like/App.js";
import { Link, useLocation } from 'react-router-dom';
import { access } from '../Access';
import LikeFav from '../like/App.js';

const token = await access();

async function feed(token, obj, limit) {
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
  let url = `https://api.spotify.com/v1/search?query=${randomSearch}&offset=${getRandomOffset}&limit=${limit}&type=${obj}&market=NL`;

  const result = fetch(url, {
    headers: { 'Authorization': "Bearer " + token }
  }).then(data => {
    return data.json()
  }).then(response => {
    if (obj === "artist") {
      return response.artists.items;
    } else if (obj === "album") {
      return response.albums.items[0];
    }
  })
  return result;
}

function pesquisa(query, token) {
  let url = `https://api.spotify.com/v1/search?query=${encodeURIComponent(query)}&type=album&market=NL&limit=20`;
  const result = fetch(url, {
    headers: { 'Authorization': "Bearer " + token }
  }).then(data => {
    return data.json()
  }).then(response => {
    return response.albums.items;
  })
  return result;
}


function FeedPagina() {
  const [feedAlbum, setFeedAlbum] = useState([]);
  const [feedArtist, setFeedArtist] = useState([]);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get('search') || "";


  const activeRef = React.useRef(true);
  useEffect(() => {
    return () => {
      activeRef.current = false;
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location]);

  const handleScroll = async () => {
    if (!activeRef.current) return;

    const pertoFinal = 200;
    const bottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - pertoFinal);

    if (bottom && searchQuery === "") {
      const albums = await feed(token, "album", 1);
      if (!activeRef.current) return;
      setFeedAlbum(oldArray => [...oldArray, albums]);
    }
  };

  async function fetchToken() {

    if (searchQuery !== "") {
      const searchResults = await pesquisa(searchQuery, token);
      setFeedAlbum(searchResults);
      return;
    }

    const artists = await feed(token, "artist", 5);
    const albums = await feed(token, "album", 1);
    if (!artists || !albums) {
      console.error("Failed to fetch artists or albums");
      return;
    }

    setFeedArtist(artists);
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
      {feedArtist ? (
        <div className="feed-artist">
          {feedArtist.map(artist => (
            <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer" key={artist.id}>
              <div className="artista" >
                <img src={artist.images[0]?.url} alt={artist.name} />
                <p>{artist.name?.length > 25 ? artist.name.slice(0, 25) + '...' : artist.name}</p>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {feedAlbum ? (
        <div className="feed-container">
          {feedAlbum.map(album => (
            <div className="post" key={album.id}>
              <Link to={`/album/${album.id}`}>
                <img src={album.images[0]?.url} alt={album.name} />
              </Link>
              <div className="descricao">
                <Link to={`/album/${album.id}`}>
                  <div className="info">
                    <h1>{album.name?.length > 25 ? album.name.slice(0, 25) + '...' : album.name}</h1>
                    <div className="infos"><p>Artistas: </p>{album.artists.map(a => a.name?.length > 25 ? a.name.slice(0, 25) + '...' : a.name).join(", ")}</div>
                    <div className="infos"><p>Musicas: </p>{album.total_tracks}</div>
                    <div className="infos"><p>Tipo: </p>{album.album_type}</div>
                    <div className="infos"><p>Lançamento(A/M/D): </p>{album.release_date.replace(/-/g, "/")}</div>
                  </div>
                </Link>
                <LikeFav />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}

export default FeedPagina;