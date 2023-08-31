import {dirname} from "path";
import {createBrowser} from "./browser.js";
import {createFileLister} from "./file-lister.js";
import {createLogger} from "./logger.js";
import {fileURLToPath} from "url";

interface Factories {
  createBrowser: typeof createBrowser,
  createFileLister: typeof createFileLister,
  createLogger: typeof createLogger,
  replaceFactoriesForTest: (replacements: Partial<Factories>) => Factories;
}

export const productionFactories: Factories = {
  createBrowser,
  createFileLister,
  createLogger,
  replaceFactoriesForTest: (replacements) => ({ ...productionFactories, ...replacements })
}

export async function main(factories: Factories = productionFactories): Promise<void> {
  // Create everything
  const logger = factories.createLogger();
  const fileLister = factories.createFileLister();
  const browser = factories.createBrowser(logger, fileLister);

  // Do the work
  const dirPath = dirname(fileURLToPath(import.meta.url));
  await browser.listDirectoryContents(dirPath);
}
