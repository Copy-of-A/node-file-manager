import * as os from "node:os";

export class Os {
  EOL() {
    console.log(JSON.stringify(os.EOL));
  }

  cpus() {
    console.log(os.cpus());
  }

  homedir() {
    console.log(os.homedir());
  }

  username() {
    console.log(os.userInfo().username);
  }

  architecture() {
    console.log(os.arch());
  }
}
