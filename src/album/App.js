import React from 'react';
import './App.css';
import { access } from '../Access';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LikeFav from '../like/App.js';

const token = await access();


function AlbumPagina() {
  const [infoAlbum, setInfoAlbum] = useState();
  const [infoArtsta, setInfoArtsta] = useState([]);
  const { pathname } = useLocation();
  const { id } = useParams();

  const [albumFavorito, setAlbumFavorito] = useState();
  const userToken = localStorage.getItem('token');
  useEffect(() => {
    if (userToken === null || userToken === undefined) {
      return
    } else if (userToken !== null && userToken !== undefined) {
      fetch(`https://sound-snap-api-node.onrender.com/api/auth/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userToken}`
        },
      })
        .then(response => response.json())
        .then(data => {
          setAlbumFavorito(data.data.favoriteAlbum);
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
    }
  }, [userToken]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    function fetchInfos() {
      fetch(`https://api.spotify.com/v1/albums/${id}`, {
        headers: { 'Authorization': "Bearer " + token }
      }).then(data => {
        return data.json()
      }).then(response => {
        setInfoAlbum(response);
        for (let i = 0; i < response.artists.length; i++) {
          fetchArtists(response.artists[i].id);
        }
      })

      async function fetchArtists(id) {
        await fetch(`https://api.spotify.com/v1/artists/${id}`, {
          headers: { 'Authorization': "Bearer " + token }
        }).then(data => {
          return data.json()
        }).then(response => {
          setInfoArtsta(oldArray => [...oldArray, response]);
        })
      }
    }
    fetchInfos();
  }, [id]);

  return (
    <main>
      <div className="album-container">
        {infoAlbum &&
          <h1 id='nome'>{infoAlbum.name}</h1>
        }
        <div className="album-informacoes">
          {infoAlbum &&
            <a href={infoAlbum.external_urls.spotify} target="_blank" rel="noopener noreferrer">
              <img src={infoAlbum.images[0].url} alt={infoAlbum.name} />
            </a>
          }
          <div className="album-infos">
            {infoAlbum &&
              <div>
                <p>Tipo de álbum: <strong>{infoAlbum.album_type}</strong></p>
                <p>Total de faixas: <strong>{infoAlbum.total_tracks}</strong></p>
                <p>Nota de popularidade: <strong>{infoAlbum.popularity}</strong></p>
                <p>Data de lançamento(A/M/D): <strong>{infoAlbum.release_date.replace(/-/g, "/")}</strong></p>
              </div>
            }
            {infoAlbum &&
              <LikeFav albumId={infoAlbum.id} albumFavorito={albumFavorito}/>
            }
          </div>
        </div>
        <div className="artistas">
          <h1>Artistas:</h1>
          <div>
            {infoArtsta.map((artist) => (
              <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer" key={artist.id}>
                <div className="artista-pag" >
                  <img src={artist.images[0]?.url} alt={artist.name} />
                  <p>{artist.name}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
        <div className="tracklist">
          <h1>Faixas:</h1>
          {infoAlbum && infoAlbum.tracks.items.map((track) => (
            <div className='faixa' key={track.id}>
              <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                {track.name}
              </a>
              <div className="artistas-faixa">
                {track.artists.map((artist, i) => (
                  <>
                    <a href={artist.external_urls.spotify} key={artist.id} target="_blank" rel="noopener noreferrer">
                      {artist.name}
                    </a>
                    {i < track.artists.length - 1 ? "\u00A0•\u00A0" : ''}
                  </>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default AlbumPagina;