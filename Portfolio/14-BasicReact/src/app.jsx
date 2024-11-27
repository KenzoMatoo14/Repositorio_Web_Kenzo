import React, { useState } from "react";
import MovieList from "./components/movielist";
import MovieDetails from "./components/moviedetails";
import sw from "./data"; // Import the data

const App = () => {
  const [selectedMovie, setSelectedMovie] = useState(null); // Cambiar a selectedMovie
  const [comments, setComments] = useState({}); // Comentarios organizados por episodio

  const handleMoreClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleSubmitComment = (episode, name, comment) => {
    setComments((prevComments) => ({
      ...prevComments,
      [episode]: [
        ...(prevComments[episode] || []),
        { name, comment },
      ],
    }));
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Star Wars Movies</h1>
      <MovieList sw={sw} onMoreClick={handleMoreClick} />
      {selectedMovie && (
        <MovieDetails
          selectedMovie={selectedMovie}
          comments={comments}
          onSubmitComment={handleSubmitComment}
        />
      )}
    </div>
  );
};

export default App;
