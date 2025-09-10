import { combineReducers } from "@reduxjs/toolkit";
import carsReducer from "./cars/slice.js";
import brandsReducer from "./brands/slice.js";

const rootReducer = combineReducers({
  cars: carsReducer,
  brands: brandsReducer,
});

export default rootReducer;