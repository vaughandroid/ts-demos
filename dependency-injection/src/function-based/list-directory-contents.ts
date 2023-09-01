import {LogFn} from "./log.js";
import {GetFilesInDirectoryFn} from "./get-files-in-directory.js";

export type ListDirectoryContentsFn = (path: string) => Promise<void>;

export function createListDirectoryContentsFn(logger: LogFn, fileLister: GetFilesInDirectoryFn): ListDirectoryContentsFn {
  return async (path: string): Promise<void> => {
    logger(`${path} contents:`)
    const files = await fileLister(path);
    for (const filename of files) {
      logger(`  - ${filename}`);
    }
  }
}
