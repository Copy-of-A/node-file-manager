export const getUserName = () => {
  const args = process.argv.slice(2);

  const userNameParamPrefix = "--username=";
  const usernameParam = args.findLast((el) =>
    el.startsWith(userNameParamPrefix)
  );

  const username =
    (usernameParam && usernameParam.slice(userNameParamPrefix.length)) ||
    "Guest";

  return username;
};
