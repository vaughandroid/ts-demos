import 'mocha';
import {SinonStub, stub, assert} from 'sinon';
import {Browser, createBrowser} from "../src/class-based-without-interfaces/browser.js";
import {Logger} from "../src/class-based-without-interfaces/logger.js";
import {FileLister} from "../src/class-based-without-interfaces/file-lister.js";
import {createFileLister} from "../src/class-based/file-lister";

describe('Class-based DI without interfaces', () => {
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

      // Since the FileLister class includes a private field and a constructor, it's hard to swap it out for tests.
      // The easiest way to do this is to disable type checking for the test double, but this can create all sorts of
      // issues down the line.
      // @ts-ignore
      const fileLister: FileLister = {
        getFilesInDirectory: getFilesInDirectoryStub
      };
      // Another way to disable type-checking is by casting to any and then to the type we want:
      const fileLister2: FileLister = {
        getFilesInDirectory: getFilesInDirectoryStub
      } as any as FileLister;

      browser = createBrowser(logger, fileLister);
    });

    it('Logs the path', async () => {
      await browser.printDirectoryContents('directory-path');

      assert.calledWith(logStub, 'directory-path contents:');
    });
  });
});
