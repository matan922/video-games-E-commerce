import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { getAllProfiles, getProfile, getMyProfile, editMyProfile } from "../APIs/communityAPI";
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
    games_bought: [],
    profileSearch: "",
    currentPage: 1,
    count: 0,
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
    async (data: { pageNumber: number, searchQuery: string }) => {
        return await getAllProfiles(data.pageNumber, data.searchQuery);
    });


export const communitySlice = createSlice({
    name: "community",
    initialState,
    reducers: {
        updateProfileSearch: (state, action) => {
            state.profileSearch = action.payload
        },

        updateCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },

        updateCount: (state, action) => {
            state.count = action.payload
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(getProfileAsync.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getProfileAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.bio = action.payload.data.bio;
                state.avatar = action.payload.data.avatar;
                state.display_name = action.payload.data.display_name;
                state.games_bought = action.payload.data.games_bought;
            })
            .addCase(getAllProfilesAsync.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getAllProfilesAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.profiles = action.payload.data
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
                state.isLoading = false
            })
            .addCase(editMyProfileAsync.fulfilled, (state, action) => {
                state.bio = action.payload.data.bio;
                state.avatar = action.payload.data.avatar;
                state.display_name = action.payload.data.display_name;
                state.isLoading = false
            })
    }
})

export const { updateProfileSearch, updateCurrentPage, updateCount } = communitySlice.actions;

export const selectProfiles = (state: RootState) => state.community.profiles;
export const selectIsLoadingProf = (state: RootState) => state.community.isLoading;
export const selectProfileSearch = (state: RootState) => state.community.profileSearch;
export const selectCurrentPage = (state: RootState) => state.community.currentPage;
export const selectCount = (state: RootState) => state.community.count;

export default communitySlice.reducer;



