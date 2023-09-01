import {dirname} from "path";
import {fileURLToPath} from "url";
import {createLogFn} from "./log.js";
import {createGetFilesInDirectoryFn} from "./get-files-in-directory.js";
import {createPrintDirectoryContentsFn} from "./list-directory-contents.js";

export async function main(): Promise<void> {
  // Create everything
  const logFn = createLogFn();
  const getFilesInDirectoryFn = createGetFilesInDirectoryFn();
  const printDirectoryContentsFn = createPrintDirectoryContentsFn(logFn, getFilesInDirectoryFn);

  // Do the work
  const dirPath = dirname(fileURLToPath(import.meta.url));
  await printDirectoryContentsFn(dirPath);
}

if (fileURLToPath(import.meta.url) === process.argv[1]) {
  main();
}
