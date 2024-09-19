import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editId: null,
};

// Create slice
const editIdSlice = createSlice({
  name: "editId",  
  initialState,
  reducers: {
    // Define synchronous action
    setEditId: (state, action) => {
      state.editId = action.payload;
    },
  },

});

// Export actions
export const { setEditId } = editIdSlice.actions;

// Export the reducer to be used in the store
export default editIdSlice.reducer;
