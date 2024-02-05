//@ts-check
import { getUserName } from "./user.js";
import { Terminal } from "./terminal.js";
import { Fs } from "./fs/fs.js";
import { Navigator } from "./navigator/navigator.js";
import { navigatorTerminalAdapter } from "./navigator/terminalAdapter.js";
import { fsTerminalAdapter } from "./fs/terminalAdapter.js";

const username = getUserName();
const navigator = new Navigator();
const fs = new Fs(navigator);
const terminal = new Terminal(username);

navigatorTerminalAdapter(navigator, terminal);
fsTerminalAdapter(fs, terminal);

const handleClose = () => {
  terminal.sayGoodbyeToUser();
  process.exit(0);
};

const printCurrentDir = () => {
  console.log(`You are currently in: ${navigator.path}\n`);
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
