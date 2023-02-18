
export interface Profile {
    user:number;
    id?:number;
    profiles: Profile[];
    display_name:string;
    avatar:string;
    bio:string;
    games_bought: [];
    isLoading:boolean;
    profileSearch: string;
    currentPage: number;
    count: number;
}


