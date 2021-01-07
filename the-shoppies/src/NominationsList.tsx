import React from 'react';
import { MovieNominationItem } from './MovieNominationItem';

interface Props {
  nominations: MovieNomination[];
  removeMovie: NominateMovie;
}

export const NominationsList: React.FC<Props> = ({ nominations, removeMovie }) => {
  return (
    <div className="movieListContainer">
      {nominations.map(movie => (
        <MovieNominationItem key={movie.Title} movie={movie} removeMovie={removeMovie} />
      ))}
    </div>
  );
};