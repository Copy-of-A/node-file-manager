class InputError extends Error {
  constructor(message) {
    super(`Invalid input: ${message}`);
  }
}
class OperationError extends Error {
  constructor(error) {
    super(`Operation failed.`);
    this.stack = error.stack;
  }
}

export class Terminal {
  #commands;
  #username;
  constructor(username) {
    this.#commands = new Map();
    this.#username = username;
  }

  addCommand(command, handler, validate) {
    this.#commands.set(command, { handler, validate });
  }

  hasCommand(command) {
    this.#commands.has(command);
  }

  async runCommand(commandName, ...args) {
    const command = this.#commands.get(commandName);
    if (!command) {
      throw new InputError(`command "${commandName}" is not supported.`);
    }
    const errorMeaage = command.validate(...args);
    if (errorMeaage) {
      throw new InputError(errorMeaage);
    }
    try {
      await command.handler(...args);
    } catch (error) {
      throw new OperationError(error);
    }
  }

  welcomeUser() {
    console.log(`Welcome to the File Manager, ${this.#username}!`);
  }

  sayGoodbyeToUser() {
    console.log(
      `\nThank you for using File Manager, ${this.#username}, goodbye!`
    );
  }
}
