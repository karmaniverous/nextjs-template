/* eslint-env mocha */

// test imports
import chai from 'chai';
const should = chai.should(); // eslint-disable-line

// import chaiAsPromised from 'chai-as-promised';
// chai.use(chaiAsPromised);

import chaiMatchPattern from 'chai-match-pattern';
chai.use(chaiMatchPattern);

// redux imports
import {
  addEntity,
  removeForm,
  selectForms,
  updateForm,
} from '../state/entitySlice.js';
import { makeStore } from '../state/store.js';

let dispatch;
let getState;

({ dispatch, getState } = makeStore());

describe('STATE', async function () {
  beforeEach(async () => {
    ({ dispatch, getState } = makeStore());
  });

  describe('ENTITY', async () => {
    describe('* validations', async () => {
      it('* initializes state', async () => {
        getState().entity.should.deep.equal({ ids: [], entities: {} });
      });
    });

    describe('add entities', async () => {
      beforeEach(async () => {
        dispatch(addEntity({ entityKey: 'entity0' }));

        dispatch(addEntity({ entityKey: 'entity1' }));
      });

      describe('* validations', async () => {
        it('* select all entities', async () => {
          const entities = selectForms(getState().entity);

          entities.should.matchPattern(`[
            {
              entityKey: 'entity0',
              created: {<-.setMemo|created: _.isNumber},
              updated: _.isEqualToMemo|created
            },
            {
              entityKey: 'entity1',
              created: {<-.setMemo|created: _.isNumber},
              updated: _.isEqualToMemo|created
            }
          ]`);
        });

        it('* select one entity', async () => {
          const entities = selectForms(getState().entity, {
            entityKey: 'entity0',
          });

          entities.should.matchPattern(`[
            {
              entityKey: 'entity0',
              created: {<-.setMemo|created: _.isNumber},
              updated: _.isEqualToMemo|created
            }
          ]`);
        });

        it('* select invalid entity', async () => {
          const entities = selectForms(getState().entity, {
            entityKey: 'entity42',
          });

          entities.should.matchPattern(`[]`);
        });
      });

      describe('update entities', async () => {
        const created = {};

        beforeEach(async () => {
          // Capture created timestamps.
          created.entity0 = getState().entity.entities.entity0?.created;
          created.entity1 = getState().entity.entities.entity1?.created;

          // Simple update.
          dispatch(updateForm({ id: 'entity0', changes: {} }));

          // Key update.
          dispatch(
            updateForm({ id: 'entity1', changes: { entityKey: 'entity42' } })
          );
        });

        describe('validations', async () => {
          it('* select all entities', async () => {
            const entities = selectForms(getState().entity);

            entities.should.matchPattern(`[
            {
              entityKey: 'entity0',
              created: ${created.entity0},
              updated: _.isGreaterThan|${created.entity0}
            },
            {
              entityKey: 'entity42',
              created: ${created.entity1},
              updated: _.isGreaterThan|${created.entity1}
            }
          ]`);
          });
        });
      });

      describe('remove entity', async () => {
        beforeEach(async () => {
          dispatch(removeForm('entity1'));
        });

        describe('validations', async () => {
          it('* select all entities', async () => {
            const entities = selectForms(getState().entity);

            entities.should.matchPattern(`[
                {
                  entityKey: 'entity0',
                  created: _.isNumber,
                  updated: _.isNumber
                }
              ]`);
          });
        });
      });
    });
  });
});
