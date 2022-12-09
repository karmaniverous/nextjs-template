// npm imports
import { createSlice } from '@reduxjs/toolkit';

// enums
export const PAGES = {
  HOME: 'HOME',
};

/* REDUX */

// Set initial state.
const initialState = {
  baseUrl: null,
  currentPage: null,
  pushRoute: null,
  sidebarVisible: false,
  siteToken: `${process.env.NEXT_PUBLIC_SITE_TOKEN}${
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? ` ${process.env.NEXT_PUBLIC_PREVIEW_TOKEN}`
      : ''
  }`,
};

// Construct slice.
const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setBaseUrl: (state, { payload }) => {
      state.baseUrl = payload;
    },
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
export const { setBaseUrl, setCurrentPage, setPushRoute, setSidebarVisible } =
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
