import React, { useState } from "react";
import CommentForm from "./commentsform";
import CommentsList from "./commentslist";

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
    <div className="character-details mt-4 card p-4">
      <h2 className="text-center">{selectedMovie.best_character.name}</h2>
      <div className="row">
        <div className="col-md-4">
          <img
            src={`images/${selectedMovie.best_character.image}`}
            alt={selectedMovie.best_character.name}
            className="img-fluid rounded-circle mb-3"
          />
        </div>
        <div className="col-md-8">
          <p><strong>Affiliation:</strong> {selectedMovie.best_character.affiliation}</p>
          <p>{selectedMovie.best_character.bio}</p>
        </div>
      </div>

      {/* Formulario de comentarios */}
      <CommentForm
        name={name}
        comment={comment}
        setName={setName}
        setComment={setComment}
        handleSubmit={handleSubmit}
      />

      {/* Mostrar comentarios solo para la película seleccionada */}
      <CommentsList comments={comments[selectedMovie.episode]} />
    </div>
  );
};

export default MovieDetails;
