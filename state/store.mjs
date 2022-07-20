// npm imports
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { createReduxMiddleware } from '@karmaniverous/serify-deserify';

// redux imports
import entityReducer from './entitySlice.mjs';
import pageReducer from './pageSlice.mjs';

// Combine reducers.
const combinedReducer = combineReducers({
  entity: entityReducer,
  page: pageReducer,
});

// Create master reducer.
const reducer = (state, action) => {
  // Support Next.js hydration.
  if (action.type === HYDRATE)
    return {
      ...state,
      ...action.payload,
    };

  // Return hydrated reducer.
  return combinedReducer(state, action);
};

// Declare serify middleware.
const serifyMiddleware = createReduxMiddleware();

// Create store.
export const makeStore = () =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware(),
      serifyMiddleware,
    ],
  });

// Create page wrapper.
export const wrapper = createWrapper(makeStore);
