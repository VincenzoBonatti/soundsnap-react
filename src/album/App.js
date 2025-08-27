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
    const album = fetch(`https://api.spotify.com/v1/albums/${id}`, {
      headers: { 'Authorization': "Bearer " + token }
    }).then(data => {
      return data.json()
    }).then(response => {
      setInfoAlbum(response);
      for (let i = 0; i < response.artists.length; i++) {
        fetchArtists(response.artists[i].id);
      }
    })

    async function fetchArtists(id){
      const artist = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
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
    <div className="teste">
        {infoArtsta.map((artist) => (
          <div key={artist.id}>
            <h1>{artist.name}</h1>
          </div>
        ))}
    </div>
  );
}

export default AlbumPagina;