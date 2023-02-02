import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { LoginAcc, RegisterAcc, MyToken } from "../../models/InterfaceAuth";
import { RootState } from "../../app/store";
import jwt_decode from 'jwt-decode';
// Get user from localStorage

export interface AuthSlice {
  userName: string;
  isSuccess: boolean;
  isLoading: boolean;
  isLogged: boolean;
  access:string | null;
  refresh:string | null;
  
}

const initialState: AuthSlice = {
  userName: "",
  isSuccess: false,
  isLoading: false,
  isLogged: false,
  access: "",
  refresh: "",
};

// register user

export const registerAsync = createAsyncThunk(
    "auth/register",
    async (userData: RegisterAcc) => {
        return await authService.register(userData);
})

// export const registerAsync = createAsyncThunk(
//   "auth/register",
//   async (userData: RegisterAcc, thunkAPI) => {
//     try {
//       console.log("no error")
//       return await authService.register(userData);
//     } catch (error: any) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//         console.log(error)
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );


export const logoutAsync = createAsyncThunk('auth/logout',
 async () => {
  authService.logout()
 })

// Login user
export const loginAsync = createAsyncThunk(
  "auth/login",
  async (userData: LoginAcc) => {
      return await authService.login(userData);
})

// export const loginAsync = createAsyncThunk(
//   "auth/login",
//   async (userData: LoginAcc, thunkAPI) => {
//     try {
//       return await authService.login(userData);
//     } catch (error: any) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAccountToFalse: (state) => {
      state.isLogged = false;
      state.isLoading = false;
    },

    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
    },

    isLoggedOff: (state) => {
      state.isLogged = false

    },

    isLoggedOn: (state) => {
      state.isLogged = true
      state.userName = localStorage.getItem('userName') as string
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userName = action.payload;
      })
      .addCase(loginAsync.pending, (state,action) => {
        state.isLoading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        const decoded:MyToken = jwt_decode(action.payload.access);
        state.userName = decoded.username
        localStorage.setItem('userName', decoded.username)
        JSON.stringify(action.payload.access)
        state.access = action.payload.access
        state.isLoading = false;
        state.isSuccess = true;
        state.isLogged = true 
        
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        localStorage.removeItem('userName')
        state.userName = ""
        state.isLogged = false
        state.access = ""
      })
  },
});

export const { reset, isLoggedOn, isLoggedOff, resetAccountToFalse } = authSlice.actions;
export const selectIsLogged = (state: RootState) => state.auth.isLogged;
export const selectUserName = (state: RootState) => state.auth.userName;
export const selectAccess = (state: RootState) => state.auth.access;
export default authSlice.reducer;
