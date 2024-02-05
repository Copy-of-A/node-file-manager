const validator =
  (required) =>
  (...args) =>
    required <= args.length ? null : "missing parameter.";

const COMMANDS = [
  { name: "ls", validate: validator(0) },
  { name: "add", validate: validator(1) },
  { name: "cat", validate: validator(1) },
  { name: "rn", validate: validator(2) },
  { name: "cp", validate: validator(2) },
  { name: "rm", validate: validator(1) },
  { name: "mv", validate: validator(2) },
];

export const fsTerminalAdapter = (manager, terminal) => {
  COMMANDS.forEach((command) =>
    terminal.addCommand(
      command.name,
      (...args) => manager[command.name](...args),
      command.validate
    )
  );
};
