import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../API/api"

export const fetchBrands = createAsyncThunk(
  'brands/fetchBrands',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/brands');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);