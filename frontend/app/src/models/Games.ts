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
    otherObject: any;
}

export class Genre {
    id?:number
    genre_name:string = ""
}