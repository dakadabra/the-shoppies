import React, { useState } from 'react';
import { NominationsList } from './NominationsList';
import { ResultsList } from './ResultsList';
// import { AddNominationForm } from './AddNominationForm';
import { SearchBar } from './SearchBar';

/*
Done:
- Add three containers + text
- Add nominate buttons
- Call addNomination with nomination button

Todo:
- Add remove functionality
- Disable Nominate button
- Add magnifying class
- Add api searches
- Shopify icon logo on tab

- Add functionality to momentarily toggle nominated movies
- Find better way to style objects
- Write "The Shoppies" in shopify font
- Full screen is "The Shoppies"
- Add instructions
*/

const initialNominations: MovieNomination[] = [];

const initialResults: MovieNomination[] = [
  {
    title: 'Jaws',
    year: 1990,
    nominated: false,
  },
  {
    title: 'Pitch Perfect',
    year: 2012,
    nominated: false,
  },
  {
    title: 'Soul',
    year: 2020,
    nominated: false,
  },
  {
    title: 'The Goblet of Fire',
    year: 2007,
    nominated: false,
  },
  {
    title: "You Don't mess with the Zohan",
    year: 2009,
    nominated: false,
  },
  {
    title: "Brothers Grimsby",
    year: 2018,
    nominated: false,
  },
  {
    title: "The Holiday",
    year: 2019,
    nominated: false,
  },
  {
    title: "Frozen",
    year: 2009,
    nominated: false,
  },
];

function App() {
  const [nominations, setNominations] = useState(initialNominations);
  const [results, setResults] = useState(initialResults);
  const [searchText, setSearchText] = useState('');
  const [nominationCount, setNominationCount] = useState(0); //TODO: Is this the best style?

  // const addSearchResult: AddSearchResult = (title: string, year: number) => {
  //   const newResult = { title, year, nominated: false };
  //   setResults([...nominations, newResult]);
  // };

  const nominateMovie = (chosenMovie: MovieNomination) => {
    if (chosenMovie.nominated === false && nominationCount < 5) {
      chosenMovie.nominated = true;
      setNominations([...nominations, chosenMovie]);
      setNominationCount(nominationCount+1);
    }
  };

  const removeMovie = (chosenMovie: MovieNomination) => {
    chosenMovie.nominated = false;
    //TODO: REMOVE MOVIE
    setNominations([...nominations]);
    setNominationCount(nominationCount-1);
  };
  
  
  return (
    <>
      <div>
        <h2>Movie title</h2>
        <SearchBar setSearchText={setSearchText}/>
        {/*TODO: THIS IS HOW TO ADD A SEARCH RESULT <AddNominationForm addNomination={addSearchResult} /> */}
      </div>

      <div className="mainContainer">
        <div className="movieContainer">
          <h2>Results for "{searchText}"</h2>
          <ResultsList resultMovies={initialResults} nominateMovie={nominateMovie} />
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