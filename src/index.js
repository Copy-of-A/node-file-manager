//@ts-check
import { getUser } from "./user.js";
import { homedir } from "./os.js";

const handleClose = () => {
  user.sayGoodbye();
  process.exit(0);
};

const handleInput = (chunk) => {
  const chunkStringified = chunk.toString();
  if (chunkStringified.includes(".exit")) handleClose();
};

const user = getUser();
user.welcome();
process.stdout.write(`You are currently in: ${homedir}\n`);
process.stdin.on("data", handleInput);
process.on("SIGINT", handleClose);
