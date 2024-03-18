//@ts-check
import { getUserName } from "./user.js";
import { Terminal } from "./terminal.js";
import { Navigator, navigatorTerminalAdapter } from "./navigator/index.js";
import { Fs, fsTerminalAdapter } from "./fs/index.js";
import {
  FileTransformation,
  fileTransformationTerminalAdapter,
} from "./fileTransformation/index.js";
import { Os, osTerminalAdapter } from "./os/index.js";

const username = getUserName();
const navigator = new Navigator();
const fs = new Fs(navigator);
const fileTransformation = new FileTransformation(navigator);
const terminal = new Terminal(username);
const os = new Os();

navigatorTerminalAdapter(navigator, terminal);
fsTerminalAdapter(fs, terminal);
fileTransformationTerminalAdapter(fileTransformation, terminal);
osTerminalAdapter(os, terminal);

const handleClose = () => {
  terminal.sayGoodbyeToUser();
  process.exit(0);
};

const printCurrentDir = () => {
  console.log(`\nYou are currently in: ${navigator.path}\n`);
};

const handleInput = async (chunk) => {
  const chunkStringified = chunk.toString().trim();
  if (chunkStringified.includes(".exit")) handleClose();
  const [command, ...args] = chunkStringified.split(" ");
  if (!command) return;
  try {
    await terminal.runCommand(command, ...args);
  } catch (err) {
    console.error(err);
  }
  printCurrentDir();
};

terminal.welcomeUser();
printCurrentDir();
process.stdin.on("data", handleInput);
process.on("SIGINT", handleClose);
