import {dirname} from "path";
import {fileURLToPath} from "url";
import {createGetFilesInDirectoryFn} from "../function-based/get-files-in-directory.js";
import {createPrintDirectoryContentsFn} from "../function-based/print-directory-contents.js";
import {createLogFn} from "../function-based/log.js";

interface Factories {
  createGetFilesInDirectoryFn: typeof createGetFilesInDirectoryFn,
  createLogFn: typeof createLogFn,
  createPrintDirectoryContentsFn: typeof createPrintDirectoryContentsFn,
  replaceFactories: (replacements: Partial<Factories>) => Factories;
}

export const productionFactories: Factories = {
  createGetFilesInDirectoryFn,
  createLogFn,
  createPrintDirectoryContentsFn,
  replaceFactories: (replacements) => ({ ...productionFactories, ...replacements })
}

export async function main(factories: Factories = productionFactories): Promise<void> {
  // Create everything
  const logFn = factories.createLogFn();
  const getFilesInDirectoryFn = factories.createGetFilesInDirectoryFn();
  const listDirectoryContentsFn = factories.createPrintDirectoryContentsFn(logFn, getFilesInDirectoryFn);

  // Do the work
  const dirPath = dirname(fileURLToPath(import.meta.url));
  await listDirectoryContentsFn(dirPath);
}

if (fileURLToPath(import.meta.url) === process.argv[1]) {
  main();
}
