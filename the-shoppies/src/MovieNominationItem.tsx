import React from 'react';

interface Props {
  movie: MovieNomination;
  removeMovie: NominateMovie;
}

export const MovieNominationItem: React.FC<Props> = ({ movie, removeMovie }) => {
  return (
    <div className="singleMovie">
        {movie.Title + " (" + movie.Year + ") "}
        <img className="poster"
            alt={movie.Title}
            src={movie.Poster === 'N/A' ? 'https://placehold.it/198x264&text=Image+Not+Found' : movie.Poster}
        />
        <button
            type="submit"
            color="2B4C40"
            onClick={() => {
                removeMovie(movie);
            }}
        >
            Remove
        </button>
    </div>
  );
};
