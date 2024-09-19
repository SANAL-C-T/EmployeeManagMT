import { createSlice } from "@reduxjs/toolkit";
import signup_a_user from "../Actions/UserAction/SignupAction";

const signUpSlice = createSlice({
    name: "New_user_signup",
    initialState: {
        loading: false,
        user: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signup_a_user.pending, (state => {
                state.loading = true;
            }))
            .addCase(signup_a_user.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                console.log("user state:",state.user)
            })
            .addCase(signup_a_user.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

    }

})

export default signUpSlice.reducer;