import * as fs from "node:fs/promises";

export const isPathExist = async (filepath) => {
  let isExist = true;

  try {
    await fs.access(filepath);
  } catch {
    isExist = false;
  }

  return isExist;
};
