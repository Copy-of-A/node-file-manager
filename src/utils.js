import * as fs from "node:fs/promises";

export const isPathExist = async (filepath) => {
  let isExist = true;

  try {
    await fs.access(filepath, fs.constants.R_OK | fs.constants.W_OK);
  } catch {
    isExist = false;
  }

  return isExist;
};
