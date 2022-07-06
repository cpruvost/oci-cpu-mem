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
  CORE.debug('Region Script Count : ' + someInput)

  execSync(`bash chmod+x ./some-bash-script.bash`);
  execSync(`bash ./some-bash-script.bash ${someInput}`);
  
} catch (error) {
  CORE.setFailed(error.message);
}