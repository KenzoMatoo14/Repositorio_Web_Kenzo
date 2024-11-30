import React, { useState } from "react";
import CommentForm from "./commentsform";
import CommentsList from "./commentslist";
import { Card, Row, Col, Image } from "react-bootstrap";

const MovieDetails = ({ selectedMovie, comments, onSubmitComment }) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && comment) {
      onSubmitComment(selectedMovie.episode, name, comment);
      setName("");
      setComment("");
    }
  };
  
  return (
    <Card className="mt-4 p-4">
      <Card.Body>
        <Card.Title className="text-center mb-4">
          {selectedMovie.best_character.name}
        </Card.Title>
        <Row>
          <Col md={4} className="text-center">
            <Image
              src={`/images/${selectedMovie.best_character.image}`}
              alt={selectedMovie.best_character.name}
              roundedCircle
              fluid
              className="mb-3"
            />
          </Col>
          <Col md={8}>
            <p>
              <strong>Affiliation:</strong> {selectedMovie.best_character.affiliation}
            </p>
            <p>{selectedMovie.best_character.bio}</p>
          </Col>
        </Row>

        {/* Comment Form */}
        <CommentForm
          name={name}
          comment={comment}
          setName={setName}
          setComment={setComment}
          handleSubmit={handleSubmit}
        />

        {/* Comments List */}
        <CommentsList comments={comments[selectedMovie.episode]} />
      </Card.Body>
    </Card>
  );
};

export default MovieDetails;
