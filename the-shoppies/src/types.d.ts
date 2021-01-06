interface MovieNomination {
    title: string;
    year: number;
    nominated: boolean;
}

type NominateMovie = (chosenMovie: MovieNomination) => void;

type AddNomination = (title: string, year: number) => void;

type AddSearchResult = (title: string, year: number) => void;

type SetSearchText = (text: string) => void;