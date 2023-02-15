import Game from "./Games";

export interface CatsState {
    categories: genreDets[]
    games: Game[]
    filtered: boolean;
}

export interface genreDets {
    id:number;
    genre_name:string
}
