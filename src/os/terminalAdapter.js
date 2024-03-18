const validator = (option) =>
  option.startsWith("--") && OPTIONS.has(option.slice(2))
    ? null
    : "unknown option.";

const OPTIONS = new Set(["EOL", "cpus", "homedir", "username", "architecture"]);

export const osTerminalAdapter = (manager, terminal) => {
  terminal.addCommand("os", (option) => manager[option.slice(2)](), validator);
};
