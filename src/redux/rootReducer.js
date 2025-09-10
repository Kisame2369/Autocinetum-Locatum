import { combineReducers } from "@reduxjs/toolkit";
import carsReducer from "./cars/slice.js";
//import filtersReducer from "./filters/slice.js";

const rootReducer = combineReducers({
  cars: carsReducer,
  //filters: filtersReducer,
});

export default rootReducer;