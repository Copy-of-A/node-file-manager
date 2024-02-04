class User {
  constructor(name) {
    this.name = name;
  }

  welcome() {
    console.log(`Welcome to the File Manager, ${this.name}!`);
  }

  sayGoodbye() {
    console.log(`\nThank you for using File Manager, ${this.name}, goodbye!`);
  }
}

export const getUser = () => {
  const args = process.argv.slice(2);

  const userNameParamPrefix = "--username=";
  const usernameParam = args.findLast((el) =>
    el.startsWith(userNameParamPrefix)
  );

  const username =
    (usernameParam && usernameParam.slice(userNameParamPrefix.length)) ||
    "Guest";

  return new User(username);
};
