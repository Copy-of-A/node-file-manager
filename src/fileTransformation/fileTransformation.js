//@ts-check
import { pipeline } from "node:stream/promises";
import * as fs from "node:fs";
import * as crypto from "node:crypto";
import * as zlib from "node:zlib";
import { isPathExist } from "../utils";

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

  async compress(pathToFile, pathToDestination) {
    if (!(await isPathExist(pathToFile))) throw new Error();
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
    if (!(await isPathExist(pathToFile))) throw new Error();
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
