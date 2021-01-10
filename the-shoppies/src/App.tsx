import React, { useState, useEffect, StrictMode } from 'react';
import { NominationsList } from './NominationsList';
import { SearchBar } from './SearchBar';
import './styles.css';
import load from './loading.gif'

// import "babel-polyfill";
// import SimpleStorage from "react-simple-storage";
// import {loadState, saveState} from './localStorage';
/*
Some of the code for using the OMDB API was inspired by: https://webomnizz.com/react-hooks-and-omdb-api-example/
*/

/*
Done:
- Add three containers + text
- Add nominate buttons
- Call addNomination with nomination button
- Add remove functionality
- Shopify icon logo on tab
- Add api searches
- Disable Nominate button
- Display a banner at 5 nominations
- Add error banner
- Write "The Shoppies" in shopify font
- Add error possibility cases (from resource)

Todo:
- long movie names

To check

Bonus
- I love it! vs Don't like it anymore :(
- Add images
- Add recent searches

- Save nomination lists if the user leaves the page
- Animations for loading, adding/deleting movies, notifications
- Create shareable links

Aesthetics
- Find better way to style objects
- Full screen is "The Shoppies"
- Add instructions
- This movie has not been created yet, maybe you should give it a shot?

*/


const API_KEY = '9fefc733';

const initialNominations: MovieNomination[] = [];

function App() {
  const [nominations, setNominations] = useState(initialNominations);
  const [nominationCount, setNominationCount] = useState(0);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [queryText, setQuery] = useState('shop');

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
  
  useEffect(() => {
      setLoading(true);
      setError(null);
      setData([]);
      fetch(`https://www.omdbapi.com/?s=${queryText}&apikey=${API_KEY}`)
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

  }, [queryText]);

  interface Props {
    Title: string;
    Year: number;
    Poster: string;
    imdbID: string;
    nominated: boolean;
    nominateMovie: NominateMovie;
  }
  
  const MovieResultItem: React.FC<Props> = ({Title, Year, Poster, imdbID, nominateMovie }) => {
    return (
      <div className="singleMovie">
        {Title + " (" + Year + ") "}
        <img className="poster"
          alt={Title}
          src={Poster === 'N/A' ? 'https://placehold.it/198x264&text=Image+Not+Found' : Poster}
        />
        <button
          type="submit"
          disabled={nominations.some(item => imdbID === item.imdbID)}
          onClick={() => {
              nominateMovie({Title, Year, Poster, imdbID});
          }}
        >
          Nominate
        </button>
      </div>
    );
  };

  // const Loader = () => (
  //   <div style={{margin: '20px 0', textAlign: 'center'}}>
  //       <Spin />
  //   </div>
  // )

  // this.subscribe(() => {
  //   saveState(nominations.getState());
  // })

  return (
    <div className="bigContainer">
      <div className="searchContainer">
        <h2>Nominate your 5 favourite movies of all time.</h2>
        <h2>Good luck with your nominations, and see you at the awards show!</h2>
        <SearchBar setSearchText={value => setQuery(value)} />
      </div>
        {/* <SimpleStorage parent={this} /> */}


      <div className="searchResults">
        <h2>Nominations</h2>
        {nominationCount === 0 && <h3>Nominate a movie below</h3>}
        <NominationsList nominations={nominations} removeMovie={removeMovie} />
      </div>

      {/* <div className="mainContainer"> */}
      <h2>Results for "{queryText}"</h2>
        <div className="movieListContainer">
          { loading && 
              <img src={load} alt="loading..." />
          }

          { error !== null &&
              <h3>
                  {error}
              </h3>
          }
          
          { data !== null && data.length > 0 && data.map((result, index) => (
            <MovieResultItem key={index} nominateMovie={nominateMovie} {...result} />
          ))}
        </div>

      {/* </div> */}
      {nominationCount === 5 && <>
      <div className="spacer"/>
      <div className="footer">You have already nominated 5 movies, which is the maximum allowed!</div>
      </>}
    </div>
  );
}

export default App;