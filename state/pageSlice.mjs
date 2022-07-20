// npm imports
import ReduxToolkit from '@reduxjs/toolkit';
const { createSlice } = ReduxToolkit;

// enums
export const PAGES = {
  HOME: 'HOME',
};

/* REDUX */

// Set initial state.
const initialState = {
  currentPage: null,
  pushRoute: null,
  sidebarVisible: false,
};

// Construct slice.
const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
    setPushRoute: (state, { payload }) => {
      state.pushRoute = payload;
    },
    setSidebarVisible: (state, { payload }) => {
      state.sidebarVisible = payload;
    },
  },
});

// Export actions.
export const { setCurrentPage, setPushRoute, setSidebarVisible } =
  pageSlice.actions;

// Export reducer.
export default pageSlice.reducer;

/* HELPERS */

// Resolve a route from state elements.
export const resolveRoute = ({ currentPage }) => {
  switch (currentPage) {
    case PAGES.HOME:
      return `/`;
    default:
      return '/';
  }
};
