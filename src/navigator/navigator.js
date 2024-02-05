//@ts-check
import { lstatSync, existsSync } from "node:fs";
import { join, isAbsolute } from "node:path";
import { homedir } from "../os.js";

const FS_ERROR_MESSAGE = "FS operation failed";

export class FsError extends Error {
  constructor(message) {
    super(FS_ERROR_MESSAGE + " " + message);
    this.name = "FsError";
  }
}

export class Navigator {
  #currentDir;
  constructor() {
    this.currentDir = homedir;
  }

  get path() {
    return this.#currentDir;
  }

  up() {
    // if (this.currentDir !== homedir) {
    //   this.currentDir = join(this.currentDir, "..");
    // }
    this.cd("..");
  }

  #isDirectory(filepath) {
    return lstatSync(filepath).isDirectory();
  }

  #isExists(filepath) {
    return existsSync(filepath);
  }

  getAbsolutePath(pathToFile) {
    return isAbsolute(pathToFile)
      ? pathToFile
      : join(this.#currentDir, pathToFile);
  }

  cd(filepath) {
    const absolutePath = this.getAbsolutePath(filepath);
    if (!this.#isExists(absolutePath))
      throw new FsError(`no such file or directory: ${filepath}`);
    if (!this.#isDirectory(absolutePath)) {
      throw new FsError(`not a directory: ${filepath}`);
    }
    if (!absolutePath.startsWith(homedir)) return;
    this.#currentDir = absolutePath;
  }
}
