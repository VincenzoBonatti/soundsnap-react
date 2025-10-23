import React from 'react';
import './App.css';
import { access } from '../Access';
import { useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';

const token = await access();


function AlbumPagina() {
  const [infoAlbum, setInfoAlbum] = useState();
  const [infoArtsta, setInfoArtsta] = useState([]);
  const { id } = useParams();

  function fetchInfos(){
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

    async function fetchArtists(id){
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
            <h1>{infoAlbum.name}</h1>
        }
        <div className="album-info">
          {infoAlbum &&
            <img src={infoAlbum.images[0].url} alt={infoAlbum.name} />
          }
          <div className="artistas">
            <h2>Artistas:</h2>
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
      </div>
    </main>
  );
}

export default AlbumPagina;