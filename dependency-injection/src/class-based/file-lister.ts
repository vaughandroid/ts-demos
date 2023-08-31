import * as fs from 'fs';

export interface FileLister {
  getFilesInDirectory(path: string): Promise<string[]>
}

export function createFileLister(): FileLister {
  return new FileListerImpl();
}

class FileListerImpl implements FileLister {
  async getFilesInDirectory(path: string): Promise<string[]> {
    return fs.promises.readdir(path);
  }
}
