import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieList from "./components/movielist";
import MovieDetailsPage from "./components/moviedetailpage";
import { Container } from "react-bootstrap";
import { LikesProvider } from "./components/LikesContext";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [comments, setComments] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/api/movies")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched movies:", data);
        setMovies(data);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

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
    <LikesProvider>
      <Router>
        <Container className="mt-4">
          <h1 className="text-center">Star Wars Movies</h1>
          <Routes>
            <Route
              path="/"
              element={<MovieList sw={movies.sw || []} />}
            />
            <Route
              path="/details/:episodeId"
              element={
                <MovieDetailsPage
                  movies={movies}
                  comments={comments}
                  onSubmitComment={handleSubmitComment}
                />
              }
            />
          </Routes>
        </Container>
      </Router>
    </LikesProvider>
  );
};

export default App;
