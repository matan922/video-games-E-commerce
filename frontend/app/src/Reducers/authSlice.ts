import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../APIs/authService";
import { LoginAcc, RegisterAcc, MyToken } from "../models/InterfaceAuth";
import { RootState } from "../app/store";
import jwt_decode from 'jwt-decode';
import { AuthSlice } from "../models/InterfaceAuth";

const initialState: AuthSlice = {
  userId: 0,
  userName: "",
  isSuccess: false,
  isLoading: false,
  isLogged: false,
  isError: false,
  isStaff: false,
  access: "",
  refresh: "",
  message: "",
};

// register user

export const registerAsync = createAsyncThunk(
  "auth/register",
  async (userData: RegisterAcc, thunkApi) => {
    try {
      return await authService.register(userData);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.error)
    }

  })

export const registerStaffAsync = createAsyncThunk(
  "auth/registerStaff",
  async (userData: RegisterAcc, thunkApi) => {
    try {
      return await authService.registerStaff(userData);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.error)
    }

  })


export const logoutAsync = createAsyncThunk('auth/logout',
  async () => {
    authService.logout()
  })

// Login user
export const loginAsync = createAsyncThunk(
  "auth/login",
  async (userData: LoginAcc,thunkApi) => {
    try {
      return await authService.login(userData);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.detail)
    }
  })



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
      state.isError = false;
      state.message = "";
    },

    isLoggedOff: (state) => {
      state.isLogged = false;
      state.isStaff = false;
    },

    isLoggedOn: (state) => {
      state.isLogged = true;
      state.userName = localStorage.getItem('userName') as string;
    },

    // adminLoggedOn: (state) => {
    //   state.isLogged = true;
    //   state.isStaff = true;
    //   state.userName = localStorage.getItem('userName') as string;
    // },

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
        state.message = action.payload["success"]
      })
      .addCase(registerStaffAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerStaffAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userName = action.payload;
        state.message = action.payload["success"]
      })
      .addCase(registerStaffAsync.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload as string
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload as string
      })
      .addCase(loginAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        const decoded: MyToken = jwt_decode(action.payload.access);
        state.userId = decoded.user_id;
        state.isStaff = decoded.is_staff;
        state.userName = decoded.username;
        localStorage.setItem('userName', decoded.username)
        localStorage.setItem('userId', decoded.user_id.toString())
        JSON.stringify(action.payload.access)
        state.access = action.payload.access
        state.isLoading = false;
        state.isSuccess = true;
        state.isLogged = true;

      })
      .addCase(logoutAsync.fulfilled, (state) => {
        localStorage.removeItem('userName')
        localStorage.removeItem('userId')
        state.isStaff = false;
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
export const selectIsStaff = (state: RootState) => state.auth.isStaff;

export default authSlice.reducer;
