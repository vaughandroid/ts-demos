import 'mocha';
import {SinonStub, stub, assert, match} from 'sinon';
import {main, productionFactories} from "../src/factory-injection/interface-based.js";

describe('Class-based factory injection', () => {
  describe('Example "integration" test', () => {
    let logStub: SinonStub;

    beforeEach(() => {
      logStub = stub();
    });

    it('Logs the path', async () => {
      const testFactories = productionFactories.replaceFactories({
        createLogger: () => ({ log: logStub })
      })

      await main(testFactories);

      assert.calledWith(logStub, match(' contents:'));
    });
  });
});
