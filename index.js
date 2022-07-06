const core = require("@actions/core");
const exec = require("@actions/exec");

async function run() {
  try {
    const someInput = core.getInput('regionscript');
    await exec.exec(`bash ./some-bash-script.bash ${someInput}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}
run();