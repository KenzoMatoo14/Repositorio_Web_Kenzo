import React from "react";
import MovieCard from "./moviecard";

const MovieList = ({ sw, onMoreClick }) => {
  return (
    <div className="row">
      {sw.map((movie) => (
        <div className="col-md-4 mb-4" key={movie.episode}>
          <MovieCard movie={movie} onMoreClick={() => onMoreClick(movie)} />
        </div>
      ))}
    </div>
  );
};

export default MovieList;
