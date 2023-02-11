import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { getAllProfiles, getProfile, getMyProfile, searchProfiles, editMyProfile } from "../APIs/communityAPI";
import { Profile } from "../models/CommunityInterfaces";
import { RootState } from "../app/store";

const initialState: Profile = {
    id: 0,
    user: 0,
    profiles: [],
    display_name: "",
    avatar: "",
    bio: "",
    isLoading: false,
    games_bought: []
}


export const getProfileAsync = createAsyncThunk('community/getProfile',
    async (id: string) => {
        return await getProfile(id);
    });

export const getMyProfileAsync = createAsyncThunk('community/getMyProfile',
    async () => {
        return await getMyProfile();
    });

export const editMyProfileAsync = createAsyncThunk('community/editMyProfile',
    async (updateData: any) => {
        return await editMyProfile(updateData);
    });


export const getAllProfilesAsync = createAsyncThunk('community/getAllProfiles',
    async () => {
        return await getAllProfiles();
    });

export const searchProfilesAsync = createAsyncThunk('community/searchProfiles',
    async (searchQuery: string) => {
        return await searchProfiles(searchQuery);
    });

// export const editProfileAsync = createAsyncThunk('community/editProfile',
//     async () => {
//         return await editProfile();
//     });



export const communitySlice = createSlice({
    name: "community",
    initialState,
    reducers: {


    },
    extraReducers: (builder) => {
        builder
            .addCase(getProfileAsync.fulfilled, (state, action) => {
                state.bio = action.payload.data.bio;
                state.avatar = action.payload.data.avatar;
                state.display_name = action.payload.data.display_name;
                state.games_bought = action.payload.data.games_bought;
            })
            .addCase(getAllProfilesAsync.fulfilled, (state, action) => {
                console.log(action.payload)
                state.profiles = action.payload.data;
            })
            .addCase(getMyProfileAsync.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getMyProfileAsync.fulfilled, (state, action) => {
                state.bio = action.payload.data.bio;
                state.avatar = action.payload.data.avatar;
                state.display_name = action.payload.data.display_name;
                state.games_bought = action.payload.data.games_bought;
                state.id = action.payload.data.id;
                console.log(action.payload)
                state.isLoading = false
            })
            .addCase(editMyProfileAsync.fulfilled, (state, action) => {
                state.bio = action.payload.data.bio;
                state.avatar = action.payload.data.avatar;
                state.display_name = action.payload.data.display_name;
                state.isLoading = false
            })
            .addCase(searchProfilesAsync.fulfilled, (state, action) => {
                state.profiles = action.payload.data
                state.isLoading = false
            })
    }
})


export const selectProfiles = (state: RootState) => state.community.profiles;

export default communitySlice.reducer;



