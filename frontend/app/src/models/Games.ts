export default class Game {
    id?: number;
    steam_image_api?:string;
    uploaded_game_image?: string;
    appid?: number;
    game_name: string = ""
    release_date?: Date
    developer: string = ""
    publisher: string = ""
    genres: Genre[] = []
    price: number = 0
}

export interface GameAndSteamData {
    my_app?: Game;
    steam_game?: { [key: string]: any };
}


export class Genre {
    id?: number
    genre_name: string = ""
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
    id?: number;
    game_name: string;
    price: string;
}

