import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    ids: [], 
  },
  reducers: {
    addFavorite: (state, action) => {
      const carId = action.payload;
      if (state.ids.includes(carId)) {
        state.ids = state.ids.filter((id) => id !== carId);
      } else {
        state.ids.push(carId);
      }
    },
  },
});

export const { addFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
