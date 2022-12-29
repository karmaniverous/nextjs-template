/* eslint-env mocha */

/*

The imports in this sample test file support both async and JSON pattern match assertions. Read more at:

chai-as-promised: https://www.chaijs.com/plugins/chai-as-promised
chai-match-pattern: https://www.npmjs.com/package/chai-match-pattern

*/

// test imports
import chai from 'chai';

import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

import chaiMatchPattern from 'chai-match-pattern';
chai.use(chaiMatchPattern);

const should = chai.should(); // eslint-disable-line

describe('back-end test', function () {
  this.timeout(0); // Disable async timeouts.

  it('passes', async function () {
    true.should.be.ok;
  });
});
