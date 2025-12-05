import React, { useState, useEffect, use } from "react";
import "./App.css";

function LikeFav({albumId, albumFavorito}) {
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const userToken = localStorage.getItem('token');

  useEffect(() => {
    if (albumFavorito === albumId) {
      setFavorited(true);
    }
  }, [albumFavorito, albumId]);
  
  function like() {
      if (userToken !== null) {
        if (!liked) {
          fetch(`https://sound-snap-api-node.onrender.com/api/auth/like-album`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${userToken}`
            }
          }).then(response => response.json())
            .then(data => {
              setLiked(!liked);
            }).catch((error) => {
              console.error("Error liking album:", error);
            });
        } else if (liked) {
          setLiked(!liked);
        }
      } else {
        alert("Você precisa estar logado para curtir álbuns.");
      }
    }
  
    const favorito = (albumId) => {
      if (userToken !== null) {
        if (!favorited) {
          if (window.confirm("Você só pode ter 1 album marcado como favorito. Deseja continuar?")) {
            fetch(`https://sound-snap-api-node.onrender.com/api/auth/favorite-album`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`,
              },
              body: JSON.stringify({
                favoriteAlbum: albumId
              })
  
            }).then(response => response.json())
              .then(data => {
                setFavorited(!favorited);
              }).catch((error) => {
                console.error("Error favoriting album:", error);
              });
          } else {
            return;
          }
        } else if (favorited) {
          fetch(`https://sound-snap-api-node.onrender.com/api/auth/favorite-album`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${userToken}`
            },
            body: JSON.stringify({
              favoriteAlbum: "0"
            })
          }).then(response => response.json())
            .then(data => {
              setFavorited(!favorited);
            }).catch((error) => {
              console.error("Error unfavoriting album:", error);
            });
        }
      } else {
        alert("Você precisa estar logado para favoritar álbuns.");
      }
    }

  return (
    <div className="acoes">

      {/* LIKE */}
      <button
        className={`btn btn-lg btn-block btn-shared btn-like ${liked ? "liked" : ""}`}
        onClick={like}
      >
        ❤️
        <span className="like-text">Like</span>

      </button>

      {/* FAVORITE */}
      <button
        className={`btn btn-lg btn-block btn-shared btn-favorite ${favorited ? "liked" : ""}`}
        onClick={() => favorito(albumId)}
      >
        ⭐
        <span className="favorite-text">Favorito</span>
      </button>

    </div>
  );
}

export default LikeFav;