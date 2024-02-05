//@ts-check
import * as fsPromises from "node:fs/promises";
import * as path from "node:path";
import * as fs from "node:fs";
import { pipeline } from "node:stream/promises";

export class Fs {
  #navigator;

  constructor(navigator) {
    this.#navigator = navigator;
  }

  async ls() {
    const files = await fsPromises.readdir(this.#navigator.path, {
      withFileTypes: true,
    });
    const result = files.map((file) => {
      return {
        name: file.name,
        type: file.isDirectory() ? "directory" : "file",
      };
    });
    console.table(result);
  }

  add(pathToFile) {
    return fsPromises.writeFile(
      this.#navigator.getAbsolutePath(pathToFile),
      ""
    );
  }

  cat(filepath) {
    const readableStream = fs.createReadStream(
      this.#navigator.getAbsolutePath(filepath),
      {
        encoding: "utf-8",
      }
    );
    return pipeline(readableStream, process.stdout);
  }

  rn(pathToFile, newFileName) {
    return fsPromises.rename(
      this.#navigator.getAbsolutePath(pathToFile),
      newFileName
    );
  }

  cp(pathToFile, pathToNewDirectory) {
    const readableStream = fs.createReadStream(
      this.#navigator.getAbsolutePath(pathToFile),
      {
        encoding: "utf-8",
      }
    );

    const writableStream = fs.createWriteStream(
      path.join(
        this.#navigator.getAbsolutePath(pathToNewDirectory),
        path.basename(pathToFile)
      ),
      {
        encoding: "utf-8",
      }
    );

    return pipeline(readableStream, writableStream);
  }

  rm(pathToFile) {
    return fsPromises.rm(this.#navigator.getAbsolutePath(pathToFile));
  }

  async mv(pathToFile, pathToNewDirectory) {
    await this.cp(pathToFile, pathToNewDirectory);
    return this.rm(pathToFile);
  }
}
