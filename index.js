const CORE = require('@actions/core');
// const GitHub = require('@actions/github');
const FS = require('fs');
const OS = require('os');
const Util = require('util');
const execSync = Util.promisify(require('child_process').execSync);

try {

  if(process.platform !== 'linux') {
    throw new Error('This action runs only on Linux currently');
  }

  const someInput = CORE.getInput('regionscript');
  CORE.debug(`Region Script Count : ${someInput}`)

  execSync(`chmod +x ./some-bash-script.sh`);
  var result = execSync(`./some-bash-script.sh ${someInput}`).toString();
  console.log(result);
  
} catch (error) {
  CORE.setFailed(error.message);
}