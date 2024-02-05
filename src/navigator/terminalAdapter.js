const validator =
  (required) =>
  (...args) =>
    required <= args.length ? null : "missing parameter.";

const COMMANDS = [
  { name: "up", validate: validator(0) },
  { name: "cd", validate: validator(1) },
];

export const navigatorTerminalAdapter = (manager, terminal) => {
  COMMANDS.forEach((command) =>
    terminal.addCommand(
      command.name,
      (...args) => manager[command.name](...args),
      command.validate
    )
  );
};
