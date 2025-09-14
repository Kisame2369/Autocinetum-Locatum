import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../API/api"



export const fetchCars = createAsyncThunk(
    'cars/fetchCars',
    async ({ brand, rentalPrice, minMileage, maxMileage, limit = 12, page = 1 }, thunkAPI ) => {
        try {
            const params = new URLSearchParams();
            if (brand) params.append("brand", brand);
            if (rentalPrice) params.append("rentalPrice", rentalPrice);
            if (minMileage) params.append("minMileage", minMileage);
            if (maxMileage) params.append("maxMileage", maxMileage);
            params.append("limit", limit);
            params.append("page", page);
            
            const response = await axios.get(`/cars?${params.toString()}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const fetchCarById = createAsyncThunk(
  "cars/fetchCarById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/cars/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);