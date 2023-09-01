import {Logger} from "./logger.js";
import {FileLister} from "./file-lister.js";

export interface Browser {
  printDirectoryContents(path: string): Promise<void>
}

export function createBrowser(logger: Logger, fileLister: FileLister): Browser {
  // Object literals can implement interfaces just as well as classes.
  return {
    printDirectoryContents: async (path: string) => {
      logger.log(`${path} contents:`)
      const files = await fileLister.getFilesInDirectory(path);
      for (const filename of files) {
        logger.log(`  - ${filename}`);
      }
    }
  }
}
