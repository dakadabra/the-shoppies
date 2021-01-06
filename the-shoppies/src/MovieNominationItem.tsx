import React from 'react';

interface Props {
  movie: MovieNomination;
  removeMovie: NominateMovie;
}

export const MovieNominationItem: React.FC<Props> = ({ movie, removeMovie }) => {
  return (
    <>
        <br/>
        <li>
        <label>
            {movie.title + " (" + movie.year + ") "}
            <button
                type="submit"
                onClick={() => {
                    removeMovie(movie);
            }}
            >
                Remove
            </button>
        </label>
        </li>
    </>
  );
};
