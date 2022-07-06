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

  const someInput = core.getInput('regionscript');

  execSync(`bash ./some-bash-script.bash ${someInput}`);
  
} catch (error) {
  CORE.setFailed(error.message);
}