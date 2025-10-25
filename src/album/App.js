import React from 'react';
import './App.css';
import { access } from '../Access';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const token = await access();


function AlbumPagina() {
  const [infoAlbum, setInfoAlbum] = useState();
  const [infoArtsta, setInfoArtsta] = useState([]);
  const { id } = useParams();

  function fetchInfos() {
    fetch(`https://api.spotify.com/v1/albums/${id}`, {
      headers: { 'Authorization': "Bearer " + token }
    }).then(data => {
      return data.json()
    }).then(response => {
      setInfoAlbum(response);
      console.log(response);
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

  useEffect(() => {
    fetchInfos();
  }, []);

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
                    <a href={artist.external_urls.spotify} key={artist.id}>
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