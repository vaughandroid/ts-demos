import 'mocha';
import {SinonStub, stub, assert} from 'sinon';
import {Browser, createBrowser} from "../src/interface-based/browser.js";
import {Logger} from "../src/interface-based/logger.js";
import {FileLister} from "../src/interface-based/file-lister.js";

describe('Class-based DI', () => {
  describe('Browser example test', () => {
    let logStub: SinonStub;
    let getFilesInDirectoryStub: SinonStub;
    let browser: Browser;

    beforeEach(() => {
      logStub = stub();
      const logger: Logger = {
        log: logStub
      }

      getFilesInDirectoryStub = stub().resolves(['file1', 'file2']);
      const fileLister: FileLister = {
        getFilesInDirectory: getFilesInDirectoryStub
      };

      browser = createBrowser(logger, fileLister);
    });

    it('Logs the path', async () => {
      await browser.printDirectoryContents('directory-path');

      assert.calledWith(logStub, 'directory-path contents:');
    });
  });
});
