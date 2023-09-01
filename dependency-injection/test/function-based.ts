import 'mocha';
import {assert, SinonStub, stub} from 'sinon';
import {createPrintDirectoryContentsFn, PrintDirectoryContentsFn} from "../src/function-based/print-directory-contents.js";


describe('Function-based DI', () => {
  describe('Print directory contents function example test', () => {
    let logFnStub: SinonStub;
    let getFilesInDirectoryFnStub: SinonStub;
    let printDirectoryContentsFn: PrintDirectoryContentsFn;

    beforeEach(() => {
      logFnStub = stub();

      getFilesInDirectoryFnStub = stub().resolves(['file1', 'file2']);

      printDirectoryContentsFn = createPrintDirectoryContentsFn(logFnStub, getFilesInDirectoryFnStub);
    });

    it('Logs the path', async () => {
      await printDirectoryContentsFn('directory-path');

      assert.calledWith(logFnStub, 'directory-path contents:');
    });
  });
});
