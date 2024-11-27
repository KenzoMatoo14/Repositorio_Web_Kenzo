import React, { useState } from "react";

const MovieCard = ({ movie, onMoreClick }) => {
  const [likeCount, setLikeCount] = useState(movie.likeCount || 0);
  const [dislikeCount, setDislikeCount] = useState(movie.dislikeCount || 0);
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = () => {
    setLikeCount(likeCount + 1);
  };

  const handleDislike = () => {
    setDislikeCount(dislikeCount + 1);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const getAffiliationColor = (affiliation) => {
    return affiliation.toLowerCase() === "jedi" || affiliation.toLowerCase() === "rebellion"
      ? "blue"
      : "red";
  };

  const getAffiliationLogo = (affiliation) => {
    const lowerAffiliation = affiliation.toLowerCase();
    if (lowerAffiliation === "jedi") {
        return "jedi.png";
    } else if (lowerAffiliation === "empire") {
        return "empire.png";
    } else if (lowerAffiliation === "rebellion") {
        return "rebel.png";
    } else if (lowerAffiliation === "sith") {
        return "sith.png";
    }
  };

  return (
    <div
      className="card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ width: "18rem", marginBottom: "1rem" }}
    >
      <div
        style={{
          backgroundColor: isHovered
            ? getAffiliationColor(movie.best_character.affiliation)
            : "transparent",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <img
          src={`images/${
            isHovered
              ? getAffiliationLogo(movie.best_character.affiliation)
              : movie.poster
          }`}
          alt={`${movie.title} poster`}
          className="card-img-top"
          style={{ height: "300px", objectFit: "contain" }}
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{movie.title}</h5>
        <p className="card-text">{movie.year}</p>
        <button onClick={() => onMoreClick(movie.best_character)} className="btn btn-primary">
          More...
        </button>
        <div className="d-flex justify-content-between mt-3">
          <button onClick={handleLike} className="btn btn-success">
            Like {likeCount}
          </button>
          <button onClick={handleDislike} className="btn btn-danger">
            Dislike {dislikeCount}
          </button>
        </div>
      </div>
    </div>
  );
};


export default MovieCard;
