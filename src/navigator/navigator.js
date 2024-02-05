//@ts-check
import { stat } from "node:fs/promises";
import { join, isAbsolute } from "node:path";
import { isPathExist } from "../utils.js";
import { homedir } from "node:os";

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
    this.#currentDir = homedir();
  }

  get path() {
    return this.#currentDir;
  }

  up() {
    this.cd("..");
  }

  async #isDirectory(filepath) {
    return (await stat(filepath)).isDirectory();
  }

  getAbsolutePath(pathToFile) {
    return isAbsolute(pathToFile)
      ? pathToFile
      : join(this.#currentDir, pathToFile);
  }

  async cd(filepath) {
    const absolutePath = this.getAbsolutePath(filepath);
    if (!(await isPathExist(absolutePath)))
      throw new FsError(`no such file or directory: ${filepath}`);
    if (!(await this.#isDirectory(absolutePath))) {
      throw new FsError(`not a directory: ${filepath}`);
    }
    if (!absolutePath.startsWith(homedir)) return;
    this.#currentDir = absolutePath;
  }
}
