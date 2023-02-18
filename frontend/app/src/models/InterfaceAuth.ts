export interface AuthSlice {
    userId: number;
    userName: string;
    isSuccess: boolean;
    isLoading: boolean;
    isLogged: boolean;
    isError: boolean;
    isStaff: boolean;
    access:string | null;
    refresh:string | null;
    message: string;
  }  


export interface RegisterAcc {
    username: string;
    password:string;
    email:string;
}

export interface LoginAcc {
    username: string;
    password: string;
}


export interface MyToken {
    user_id: number;
    username: string;
    is_staff: boolean;
}