//@ts-check
import { pipeline } from "node:stream/promises";
import * as fs from "node:fs";
import * as crypto from "node:crypto";
import * as zlib from "node:zlib";
import * as fsPromises from "node:fs/promises";

export class FileTransformation {
  #navigator;

  constructor(navigator) {
    this.#navigator = navigator;
  }

  hash(pathToFile) {
    const readableStream = fs.createReadStream(
      this.#navigator.getAbsolutePath(pathToFile),
      {
        encoding: "utf-8",
      }
    );

    const hash = crypto.createHash("sha256");
    hash.setEncoding("hex");

    return pipeline(readableStream, hash, process.stdout, {
      end: false,
    });
  }

  async #isPathExist(filepath) {
    let isExist = true;

    try {
      await fsPromises.access(
        filepath,
        fsPromises.constants.R_OK | fsPromises.constants.W_OK
      );
    } catch {
      isExist = false;
    }

    return isExist;
  }

  async compress(pathToFile, pathToDestination) {
    if (!(await this.#isPathExist(pathToFile))) throw new Error();
    const zip = zlib.createBrotliCompress();
    const source = fs.createReadStream(
      this.#navigator.getAbsolutePath(pathToFile)
    );
    const destination = fs.createWriteStream(
      this.#navigator.getAbsolutePath(pathToDestination)
    );

    return pipeline(source, zip, destination);
  }

  async decompress(pathToFile, pathToDestination) {
    if (!(await this.#isPathExist(pathToFile))) throw new Error();
    const unzip = zlib.createBrotliDecompress();
    const source = fs.createReadStream(
      this.#navigator.getAbsolutePath(pathToFile)
    );
    const destination = fs.createWriteStream(
      this.#navigator.getAbsolutePath(pathToDestination)
    );

    return pipeline(source, unzip, destination);
  }
}
