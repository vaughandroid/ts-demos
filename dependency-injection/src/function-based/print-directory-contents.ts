import {LogFn} from "./log.js";
import {GetFilesInDirectoryFn} from "./get-files-in-directory.js";

export type PrintDirectoryContentsFn = (path: string) => Promise<void>;

export function createPrintDirectoryContentsFn(logger: LogFn, fileLister: GetFilesInDirectoryFn): PrintDirectoryContentsFn {
  return async (path: string): Promise<void> => {
    logger(`${path} contents:`)
    const files = await fileLister(path);
    for (const filename of files) {
      logger(`  - ${filename}`);
    }
  }
}
