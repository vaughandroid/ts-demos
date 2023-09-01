import {Logger} from "./logger.js";
import {FileLister} from "./file-lister.js";

export function createBrowser(logger: Logger, fileLister: FileLister): Browser {
  return new Browser(logger, fileLister);
}

export class Browser {

  constructor(
    private readonly logger: Logger,
    private readonly fileLister: FileLister
  ) {
  }

  async printDirectoryContents(path: string): Promise<void> {
    this.logger.log(`${path} contents:`)
    const files = await this.fileLister.getFilesInDirectory(path);
    for (const filename of files) {
      this.logger.log(`  - ${filename}`);
    }
  }
}

