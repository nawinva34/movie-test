import MovieGrid from "./MovieGrid";
import React from "react";
import { useParams } from "react-router-dom";

const MovieDetail = ({ data }) => {
  const { movieId } = useParams();
  const movie = data.find((movie) => movie.id.toString() === movieId);

  if (!movie) {
    return <div>Movie not found.</div>;
  }

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      {/* Add more details here */}
    </div>
  );
};

export default MovieDetail;
