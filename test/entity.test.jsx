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
  removeEntity,
  selectEntities,
  updateEntity,
} from '../state/entitySlice.mjs';
import { makeStore } from '../state/store.mjs';

let dispatch;
let getState;

({ dispatch, getState } = makeStore());

describe('STATE', function () {
  beforeEach(async function () {
    ({ dispatch, getState } = makeStore());
  });

  describe('ENTITY', function () {
    describe('* validations', function () {
      it('* initializes state', async function () {
        getState().entity.should.deep.equal({ ids: [], entities: {} });
      });
    });

    describe('add entities', function () {
      beforeEach(async function () {
        dispatch(addEntity({ entityKey: 'entity0' }));

        dispatch(addEntity({ entityKey: 'entity1' }));
      });

      describe('* validations', function () {
        it('* select all entities', async function () {
          const entities = selectEntities(getState().entity);

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

        it('* select one entity', async function () {
          const entities = selectEntities(getState().entity, {
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

        it('* select invalid entity', async function () {
          const entities = selectEntities(getState().entity, {
            entityKey: 'entity42',
          });

          entities.should.matchPattern(`[]`);
        });
      });

      describe('update entities', function () {
        const created = {};

        beforeEach(async function () {
          // Capture created timestamps.
          created.entity0 = getState().entity.entities.entity0?.created;
          created.entity1 = getState().entity.entities.entity1?.created;

          // Simple update.
          dispatch(updateEntity({ id: 'entity0', changes: {} }));

          // Key update.
          dispatch(
            updateEntity({ id: 'entity1', changes: { entityKey: 'entity42' } })
          );
        });

        describe('validations', function () {
          it('* select all entities', async function () {
            const entities = selectEntities(getState().entity);

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

      describe('remove entity', function () {
        beforeEach(async function () {
          dispatch(removeEntity('entity1'));
        });

        describe('validations', function () {
          it('* select all entities', async function () {
            const entities = selectEntities(getState().entity);

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
