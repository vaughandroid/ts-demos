import {dirname} from "path";
import {createBrowser} from "./browser.js";
import {createFileLister} from "./file-lister.js";
import {createLogger} from "./logger.js";
import {fileURLToPath} from "url";

export async function main(): Promise<void> {
  // Create everything
  const logger = createLogger();
  const fileLister = createFileLister();
  const browser = createBrowser(logger, fileLister);

  // Do the work
  const dirPath = dirname(fileURLToPath(import.meta.url));
  await browser.printDirectoryContents(dirPath);
}

if (fileURLToPath(import.meta.url) === process.argv[1]) {
  main();
}
