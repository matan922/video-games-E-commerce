import { Profile } from "./CommunityInterfaces";
import Game from "./Games";

export interface GamePagination {
    count:number;
    next:string;
    previous:string;
    results: Game[];
}


export interface CommunityPagination {
    count:number;
    next:string;
    previous:string;
    results: Profile[];
}


export interface NextPage {
    next: string
}

export interface PrevPage {
    previous: string;
  }
  