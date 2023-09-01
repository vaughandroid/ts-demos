import * as fs from 'fs';

export function createFileLister(): FileLister {
  return new FileLister();
}

/**
 * Includes a spurious field and constructor to demonstrate how this impacts tests.
 */
export class FileLister {

  private readonly foo: string = 'bar';

  constructor(bar: string = 'bar') {
  }

  async getFilesInDirectory(path: string): Promise<string[]> {
    return fs.promises.readdir(path);
  }
}
