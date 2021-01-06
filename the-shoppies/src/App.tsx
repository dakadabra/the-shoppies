import React, { useState, useEffect } from 'react';
import { NominationsList } from './NominationsList';
import { SearchBar } from './SearchBar';

/*
Done:
- Add three containers + text
- Add nominate buttons
- Call addNomination with nomination button
- Add remove functionality
- Shopify icon logo on tab
- Add api searches
- Disable Nominate button

Todo:
- Add error possibility cases (from resource)
- Display a banner at 5 nominations

To check
- Movie duplicates

Bonus
- Add images
- Add functionality to momentarily toggle nominated movies
- Add recent searches
- Save nomination lists if the user leaves the page
- Animations for loading, adding/deleting movies, notifications
- Create shareable links

Aesthetics
- Add magnifying class
- Find better way to style objects
- Write "The Shoppies" in shopify font
- Full screen is "The Shoppies"
- Add instructions

*/


const API_KEY = '9fefc733';

const initialNominations: MovieNomination[] = [];

function App() {
  const [nominations, setNominations] = useState(initialNominations);
  const [searchText, setSearchText] = useState('');
  const [nominationCount, setNominationCount] = useState(0); //TODO: Is this the best style?

  //if the movie has not already been nominated and there are less than 5 nominations, nominate it
  const nominateMovie = (chosenMovie: MovieNomination) => {
    if (!(nominations.some(item => chosenMovie.imdbID === item.imdbID)) && nominationCount < 5) {
      setNominations([...nominations, chosenMovie]);
      setNominationCount(nominationCount+1);
    }
  };

  //remove the movie from the list of nominations
  const removeMovie = (chosenMovie: MovieNomination) => {
    const filteredist = nominations.filter((movie) => movie !== chosenMovie);
    setNominations(filteredist);
    setNominationCount(nominationCount-1);
  };
  

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [q, setQuery] = useState('shop');

  useEffect(() => {
      setLoading(true);
      setError(null);
      setData([]);
      fetch(`http://www.omdbapi.com/?s=${q}&apikey=${API_KEY}`)
      .then(resp => resp)
      .then(resp => resp.json())
      .then(response => {
          if (response.Response === 'False') {
              setError(response.Error);
          }
          else {
              setData(response.Search);
          }

          setLoading(false);
      })
      .catch(({message}) => {
          setError(message);
          setLoading(false);
      })

  }, [q]);


  interface Props {
    Title: string;
    Year: number;
    imdbID: string;
    nominated: boolean;
    nominateMovie: NominateMovie;
  }
  
  const MovieResultItem: React.FC<Props> = ({Title, Year, imdbID, nominateMovie }) => {
    return (
      <>
          <br/>
          <li>
          <label>
              {Title + " (" + Year + ") "}
              <button
                type="submit"
                disabled={nominations.some(item => imdbID === item.imdbID)}
                onClick={() => {
                    nominateMovie({title: Title, year: Year, imdbID});
                }}
              >
                Nominate
              </button>
          </label>
          </li>
      </>
    );
  };

  return (
    <>
      <div>
        <h2>Movie title</h2>
        <SearchBar setSearchText={value => setQuery(value)} />
      </div>

      <div className="mainContainer">
        <div className="movieContainer">
          <h2>Results for "{searchText}"</h2>
          { data !== null && data.length > 0 && data.map((result, index) => (
            <MovieResultItem key={index} nominateMovie={nominateMovie} {...result} />
          ))}
        </div>

        <div className="movieContainer">
          <h2>Nominations</h2>
          <NominationsList nominations={nominations} removeMovie={removeMovie} />
        </div>
      </div>
    </>
  );
}

export default App;