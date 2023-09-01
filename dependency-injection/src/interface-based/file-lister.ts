import * as fs from 'fs';

export interface FileLister {
  getFilesInDirectory(path: string): Promise<string[]>
}

export function createFileLister(): FileLister {
  return new FileListerImpl();
}

/**
 * Includes a spurious field and constructor to demonstrate that this does not impact tests.
 */
class FileListerImpl implements FileLister {

  private readonly foo: string = 'bar';

  constructor(bar: string = 'bar') {
  }

  async getFilesInDirectory(path: string): Promise<string[]> {
    return fs.promises.readdir(path);
  }
}
