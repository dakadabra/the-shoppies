import React from 'react';
import { MovieResultItem } from './MovieResultItem';

interface Props {
  resultMovies: MovieNomination[];
  nominateMovie: NominateMovie;
}

export const ResultsList: React.FC<Props> = ({ resultMovies, nominateMovie }) => {
  return (
    <ul>
      {resultMovies.map(movie => (
        <MovieResultItem key={movie.title} movie={movie} nominateMovie={nominateMovie} />
      ))}
    </ul>
  );
};