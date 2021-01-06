import React from 'react';
import { MovieNominationItem } from './MovieNominationItem';

interface Props {
  nominations: MovieNomination[];
  removeMovie: NominateMovie;
}

export const NominationsList: React.FC<Props> = ({ nominations, removeMovie }) => {
  return (
    <ul>
      {nominations.map(movie => (
        <MovieNominationItem key={movie.title} movie={movie} removeMovie={removeMovie} />
      ))}
    </ul>
  );
};