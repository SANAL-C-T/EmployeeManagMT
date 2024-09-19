
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  deleteId: null,
};

const deleteIdSlice = createSlice({
  name: "deleteId", 
  initialState,
  reducers: {
    // Define synchronous action to set the delete ID
    setDeleteId: (state, action) => {
      state.deleteId = action.payload;
    },
    // Define other synchronous actions if needed
  },

});

// Export actions
export const { setDeleteId } = deleteIdSlice.actions;

// Export the reducer to be used in the store
export default deleteIdSlice.reducer;
