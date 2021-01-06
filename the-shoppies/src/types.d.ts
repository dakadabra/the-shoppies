interface MovieNomination {
    title: string;
    year: number;
    imdbID: string;
}

type NominateMovie = (chosenMovie: MovieNomination) => void;

type AddNomination = (title: string, year: number) => void;

type AddSearchResult = (title: string, year: number) => void;

type SetSearchText = (text: string) => void;