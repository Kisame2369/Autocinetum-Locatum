export const selectCars = (state) => state.cars.items;
export const selectIsLoading = (state) => state.cars.isLoading;
export const selectCurrentPage = (state) => state.cars.page;
export const selectTotalPages = (state) => state.cars.totalPages;
export const selectHasNextPage = (state) => state.cars.page < state.cars.totalPages;
export const selectCurrentFilters = (state) => state.cars.currentFilters