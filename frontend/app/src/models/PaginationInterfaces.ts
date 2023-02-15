import Game from "./Games";

export interface Temp {
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
  