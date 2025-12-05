import React from 'react';
import './App.css';
import { access } from '../Access';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const token = await access();

function ProfilePage() {
  const [user, setUser] = useState();
  const [albumFavorito, setAlbumFavorito] = useState();
  const userToken = localStorage.getItem('token');

  useEffect(() => {
    fetch(`https://sound-snap-api-node.onrender.com/api/auth/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userToken}`
      },
    })
      .then(response => response.json())
      .then(data => {
        setUser(data.data);
        if (data.data.favoriteAlbum !== null && data.data.favoriteAlbum !== "0") {
          fetchFavorito(data.data.favoriteAlbum);
        }
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });

    async function fetchFavorito(albumId) {
      await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
        headers: { 'Authorization': "Bearer " + token }
      }).then(data => {
        return data.json()
      }).then(response => {
        setAlbumFavorito(response);
      })
    }
  }, [token]);

  return (
    <main>
      <div className="profile-container">
        {user &&
          <div className="user-profile">
            <h1>Olá {user.name}</h1>
            <div className="infos-profile">
              <h2>{user.email}</h2>
              <h2>Membro desde: {new Date(user.createdAt).toLocaleDateString()}</h2>
              <h2>Albuns curtidos: {user.likedAlbuns}</h2>
            </div>
          </div>
        }
        {albumFavorito ? (
          <div className="favorito-profile">
            <h2>Album Favorito:</h2>
            <Link to={`/album/${albumFavorito.id}`} className="album-favorito">
              <h1>{albumFavorito.name}</h1>
              <img src={albumFavorito.images[0].url} alt={albumFavorito.name} />
            </Link>
          </div>
        ) : (<h2>Você não escolheu um álbum favorito ainda.</h2>)
        }
      </div>
    </main>
  )
}

export default ProfilePage;