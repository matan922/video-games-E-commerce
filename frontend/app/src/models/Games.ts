export default class Game {
    id?:number;
    game_image?:string;
    appid?:number;
    game_name:string = ""
    release_date?:Date
    developer:string = ""
    publisher:string = ""
    genres:Genre[] = []
    price:number = 0
}


export class Genre {
    id?:number
    genre_name:string = ""
}

export interface AddToCartAction {
    type: 'addToCart';
    payload: any;
  }
  

export interface orderData {
    full_name: string;
    address: string;
    city: string;
    zip: string;
}

export interface CartInterface {
    id?:number;
    game_name:string;
    price:string;
}

export interface SteamGame {
    
}