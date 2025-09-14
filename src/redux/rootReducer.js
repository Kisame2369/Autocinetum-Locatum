import { combineReducers } from "@reduxjs/toolkit";
import carsReducer from "./cars/slice.js";
import brandsReducer from "./brands/slice.js";
import favoritesReduser from "./favorites/slice.js"

const rootReducer = combineReducers({
  cars: carsReducer,
  brands: brandsReducer,
  favorites: favoritesReduser,
});

export default rootReducer;