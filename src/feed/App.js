'use client';
import React, { useEffect, useState} from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { access } from '../Access';


async function feed(token){
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

        let url = `https://api.spotify.com/v1/search?query=${randomSearch}&offset=${getRandomOffset}&limit=1&type=album&market=NL`;

        const result = fetch(url, {
            headers: {'Authorization': "Bearer " + token}
        }).then(data => {
            return data.json()
        }).then(response =>{
            return response.albums.items[0];
        })
        console.log(await result)
        responses.push(await result);

    }
    return responses;
}



function FeedPagina() {
  const [feedData, setFeedData] = useState([]);

  useEffect(() => {
    async function fetchToken() {
      let token = await access();
      const data = await feed(token);
      setFeedData(data);
    }
    fetchToken();
  }, []);

  return (
    <main>
      {feedData.length > 0 ? (
        <pre>{feedData.map((item, index) => (
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