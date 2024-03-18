const validator =
  (required) =>
  (...args) =>
    required <= args.length ? null : "missing parameter.";

const COMMANDS = [
  { name: "hash", validate: validator(1) },
  { name: "compress", validate: validator(2) },
  { name: "decompress", validate: validator(2) },
];

export const fileTransformationTerminalAdapter = (manager, terminal) => {
  COMMANDS.forEach((command) =>
    terminal.addCommand(
      command.name,
      (...args) => manager[command.name](...args),
      command.validate
    )
  );
};
