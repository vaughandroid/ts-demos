import {dirname} from "path";
import {createBrowser} from "../interface-based/browser.js";
import {createFileLister} from "../interface-based/file-lister.js";
import {createLogger} from "../interface-based/logger.js";
import {fileURLToPath} from "url";

interface Factories {
  createBrowser: typeof createBrowser,
  createFileLister: typeof createFileLister,
  createLogger: typeof createLogger,
  replaceFactories: (replacements: Partial<Factories>) => Factories;
}

export const productionFactories: Factories = {
  createBrowser,
  createFileLister,
  createLogger,
  replaceFactories: (replacements) => ({ ...productionFactories, ...replacements })
}

export async function main(factories: Factories = productionFactories): Promise<void> {
  // Create everything
  const logger = factories.createLogger();
  const fileLister = factories.createFileLister();
  const browser = factories.createBrowser(logger, fileLister);

  // Do the work
  const dirPath = dirname(fileURLToPath(import.meta.url));
  await browser.printDirectoryContents(dirPath);
}

if (fileURLToPath(import.meta.url) === process.argv[1]) {
  main();
}
