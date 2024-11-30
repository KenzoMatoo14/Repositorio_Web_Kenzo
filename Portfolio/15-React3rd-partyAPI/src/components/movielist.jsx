import React from "react";
import MovieCard from "./moviecard";
import { Row, Col } from "react-bootstrap";

const MovieList = ({ sw, onMoreClick }) => {
  if (!Array.isArray(sw)) {
    console.error("sw is not an array:", sw);
    return null;
  }

  return (
    <Row>
      {sw.map((movie) => (
        <Col md={4} className="mb-4" key={movie.episode}>
          <MovieCard movie={movie} onMoreClick={() => onMoreClick(movie)} />
        </Col>
      ))}
    </Row>
  );
};

export default MovieList;
