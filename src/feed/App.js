'use client';
import React, { useEffect, useState} from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { access } from '../Access';


async function feed(token, obj){
  let responses = []
    for(let i = 0; i < 8; i++){
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
            headers: {'Authorization': "Bearer " + token}
        }).then(data => {
            return data.json()
        }).then(response =>{
          if(obj === "artist"){
            return response.artists.items[0];
          } else if(obj === "album"){
            return response.albums.items[0];  
          }
        })
        responses.push(await result);
        
      }
      console.log(responses)
    return responses;
}



function FeedPagina() {
  const [feedAlbum, setFeedAlbum] = useState([]);
  const [feedArtist, setFeedArtist] = useState([]);

  useEffect(() => {
    async function fetchToken() {
      let token = await access();
      const artists = await feed(token, "artist");
      const albums = await feed(token, "album");

      setFeedArtist(artists);
      setFeedAlbum(albums);
    }
    fetchToken();
  }, []);

  return (
    <main>
      {feedAlbum.length > 0 ? (
        <pre>
          {feedAlbum.map((item, index) => (
            <div key={index}>
              <h2>{item.name}</h2>
              <p>{item.artists.map(artist => artist.name).join(', ')}</p>
            </div>
          ))}
        </pre>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}

export default FeedPagina;