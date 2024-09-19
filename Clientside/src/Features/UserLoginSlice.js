import { createSlice } from "@reduxjs/toolkit";
import login_a_user from "../Actions/UserAction/LoginAction";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loads: false,
    loggeduser: null,
    errorr: null,
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(login_a_user.pending, (state) => {
        state.loads = true;
        state.errorr = null;
      })
      .addCase(login_a_user.fulfilled, (state, action) => {
        state.loads = false;
        state.loggeduser = action.payload;
        state.errorr = null;
      })
      .addCase(login_a_user.rejected, (state, action) => {
        state.loads = false;
        state.errorr = action.payload.message;
      });
  },
});

export default authSlice.reducer;