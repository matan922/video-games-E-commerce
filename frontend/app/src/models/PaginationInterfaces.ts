import Game from "./Games";

export interface temp {
    count:number;
    next:string;
    previous:string;
    results: Game[];
}

export interface NextPage {
    next: string
}

export interface PrevPage {
    previous: string;
  }
  