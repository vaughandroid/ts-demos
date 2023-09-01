import * as fs from 'fs';

export type GetFilesInDirectoryFn = (path: string) => Promise<string[]>;

export function createGetFilesInDirectoryFn(): GetFilesInDirectoryFn {
  return (path) => fs.promises.readdir(path);
}
