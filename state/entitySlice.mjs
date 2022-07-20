// npm imports
import _ from 'lodash';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

/* REDUX */

// Create entity adapter.
const entityAdapter = createEntityAdapter({
  selectId: ({ entityKey }) => entityKey,
  // Don't need a sortComparer this time.
  // sortComparer: (a, b) => b.created - a.created,
});

// Set initial state.
const initialState = entityAdapter.getInitialState({});

// Construct slice.
const entitySlice = createSlice({
  name: 'entity',
  initialState,
  reducers: {
    addEntity: (state, { payload: entity }) =>
      entityAdapter.addOne(state, {
        ...entity,
        created: Date.now(),
        updated: Date.now(),
      }),

    removeEntity: (state, { payload: id }) =>
      entityAdapter.removeOne(state, id),

    updateEntity: (state, { payload: { id, changes } }) =>
      entityAdapter.updateOne(state, {
        id,
        changes: { ..._.omit(changes, 'created'), updated: Date.now() },
      }),
  },
});

// Export actions.
export const { addEntity, removeEntity, updateEntity } = entitySlice.actions;

// Export reducer.
export default entitySlice.reducer;

/**
 * Select entities.
 *
 * @param {Object} state - Entity state.
 * @param {Object} [options] - Select parameters.
 * @param {string} [options.entityKey] - Null or undefined acts as wildcard.
 *
 * @returns  {Object[]} Array of matching entities.
 */
export const selectEntities = (state, { entityKey } = {}) => {
  const selectors = entityAdapter.getSelectors();

  // Select all forms.
  if (_.isNil(entityKey)) return selectors.selectAll(state);

  // Select a single form.
  const entity = selectors.selectById(state, entityKey);
  return entity ? [entity] : [];
};
