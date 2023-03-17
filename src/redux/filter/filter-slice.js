import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter: (_, { payload }) => payload,
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
// const filterReducer = createReducer('', {
//   [setFilter]: (_, { payload }) => payload,
// });
