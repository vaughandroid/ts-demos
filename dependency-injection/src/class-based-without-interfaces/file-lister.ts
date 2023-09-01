import * as fs from 'fs';

export function createFileLister(): FileLister {
  return new FileLister();
}

export class FileLister {
  async getFilesInDirectory(path: string): Promise<string[]> {
    return fs.promises.readdir(path);
  }
}
