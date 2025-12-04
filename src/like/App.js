import React, { useState } from "react";
import "./App.css";

function LikeFav() {
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);

  return (
    <div className="acoes">

      {/* LIKE */}
      <button
        className={`btn btn-lg btn-block btn-shared btn-like ${liked ? "liked" : ""}`}
        onClick={() => setLiked(!liked)}
      >
        ❤️
        <span className="like-text">Like</span>

      </button>

      {/* FAVORITE */}
      <button
        className={`btn btn-lg btn-block btn-shared btn-favorite ${favorited ? "liked" : ""}`}
        onClick={() => setFavorited(!favorited)}
      >
        ⭐
        <span className="favorite-text">Favorito</span>
      </button>

    </div>
  );
}

export default LikeFav;