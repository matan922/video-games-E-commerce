import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile } from "./communityAPI";
import { Profile } from "../../models/CommunityInterfaces";

const initialState: Profile = {
    displayName: "",
    avatar: "",
    bio: "",
    games: [],
    loading: false,
}


export const getProfileAsync = createAsyncThunk('community/getAllProfiles',
    async () => {
        return await getProfile();
    });

// export const editProfileAsync = createAsyncThunk('community/getAllProfiles',
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
                state.displayName = action.payload.data.displayName;
                state.games = action.payload.data.games;
            })
            // .addCase(editProfileAsync.fulfilled, (state, action) => {
                
            // })
    }
})



export default communitySlice.reducer;



