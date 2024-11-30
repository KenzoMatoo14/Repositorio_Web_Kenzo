import React from "react";
import { Card, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLikes } from "./LikesContext";

const MovieCard = ({ movie }) => {
  const { likesData, updateLikes } = useLikes();

  const likeCount = likesData[movie.episode]?.likeCount || 0;
  const dislikeCount = likesData[movie.episode]?.dislikeCount || 0;

  const handleLike = () => updateLikes(movie.episode, 1, 0);
  const handleDislike = () => updateLikes(movie.episode, 0, 1);

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={`images/${movie.poster}`}
        style={{ height: "300px", objectFit: "contain" }}
      />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.year}</Card.Text>

        <Link to={`/details/${movie.episode}`}>
          <Button variant="primary">More...</Button>
        </Link>

        <Container className="d-flex justify-content-between mt-3">
          <Button variant="success" onClick={handleLike}>
            Like {likeCount}
          </Button>
          <Button variant="danger" onClick={handleDislike}>
            Dislike {dislikeCount}
          </Button>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
