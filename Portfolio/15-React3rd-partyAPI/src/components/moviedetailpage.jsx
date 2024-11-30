import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieDetails from "./moviedetails";

const MovieDetailsPage = ({ movies, comments, onSubmitComment }) => {
  const { episodeId } = useParams();
  const navigate = useNavigate();

  // Find the selected movie based on the episodeId
  const selectedMovie = movies.sw?.find(
    (movie) => String(movie.episode) === episodeId
  );

  if (!selectedMovie) {
    return (
      <div className="text-center mt-5">
        <h2>Movie not found!</h2>
        <button className="btn btn-secondary" onClick={() => navigate("/")}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <MovieDetails
      selectedMovie={selectedMovie}
      comments={comments}
      onSubmitComment={onSubmitComment}
    />
  );
};

export default MovieDetailsPage;
