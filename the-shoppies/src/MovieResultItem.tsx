import React from 'react';

interface Props {
  movie: MovieNomination;
  nominateMovie: NominateMovie;
}

export const MovieResultItem: React.FC<Props> = ({ movie, nominateMovie }) => {
  return (
    <>
        <br/>
        <li>
        <label>
            {movie.title + " (" + movie.year + ") "}
            <button
                type="submit"
                disabled={movie.nominated}
                onClick={() => {
                    nominateMovie(movie);
            }}
            >
              Nominate
            </button>
        </label>
        </li>
    </>
  );
};
