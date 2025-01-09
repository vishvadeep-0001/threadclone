import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openAddPostModal: false,
  openEditProfileModal: false
};

export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
   addPostModal: (state, action)=>{
    state.openAddPostModal = action.payload;
   },
   editProfileModal: (state, action)=>{
    state.openEditProfileModal = action.payload;
   }
  },
});
export const { addPostModal, editProfileModal } = serviceSlice.actions;

export default serviceSlice.reducer;
