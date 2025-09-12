import { createSlice } from '@reduxjs/toolkit';
import { fetchCars } from './operations.js';

const carsSlice = createSlice({
    name: 'cars',
    initialState: {
        items: [],
        totalCars: 0,
        page: 1,
        totalPages: 0,
        isLoading: false,
        error: null,
        currentFilters: {},
    },

    reducers: {
        resetCars: (state) => {
            state.items = [];
            state.page = 1;
            state.totalCars = 0;
            state.totalPages = 1;
            state.error = null;
        },
        setFilters: (state, action) => {
            state.currentFilters = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchCars.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchCars.fulfilled, (state, action) => {
            state.isLoading = false;
            const { cars, totalCars, totalPages, page } = action.payload;

            if (Number(page) === 1) {
                state.items = cars;
            } else {
                state.items = [...state.items, ...cars];
            }

            state.totalCars = totalCars;
            state.totalPages = totalPages;
            state.page = Number(page);
        })
        .addCase(fetchCars.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    }
});

export const { resetCars, setFilters } = carsSlice.actions;
export default carsSlice.reducer;
      