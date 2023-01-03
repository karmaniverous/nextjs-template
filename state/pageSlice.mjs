// npm imports
import { createSlice } from '@reduxjs/toolkit';

// enums
export const PAGES = {
  HOME: 'HOME',
  PRIVATE: 'PRIVATE',
};

/* REDUX */

// Set initial state.
const initialState = {
  baseUrl: null,
  comingSoon: process.env.COMING_SOON === '1',
  currentPage: null,
  logoutUrl: null,
  pushRoute: null,
  sidebarVisible: false,
  siteName: `${process.env.SITE_NAME_TOKEN}${
    process.env.SITE_ENV_TOKEN ? ` ${process.env.SITE_ENV_TOKEN}` : ''
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
    setLogoutUrl: (state, { payload }) => {
      state.logoutUrl = payload;
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
export const {
  setBaseUrl,
  setCurrentPage,
  setLogoutUrl,
  setPushRoute,
  setSidebarVisible,
} = pageSlice.actions;

// Export reducer.
export default pageSlice.reducer;

/* HELPERS */

// Resolve a route from state elements.
export const resolveRoute = ({ currentPage }) => {
  switch (currentPage) {
    case PAGES.HOME:
      return `/`;
    case PAGES.PRIVATE:
      return `/private`;
    default:
      return '/';
  }
};
