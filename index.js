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

  const oci_user = CORE.getInput('user');
  const oci_tenancy = CORE.getInput('tenancy');
  const oci_fingerprint = CORE.getInput('fingerprint');
  const oci_region = CORE.getInput('region');
  const oci_api_key = CORE.getInput('api_key');
  const cli_version = CORE.getInput('cli_version');

  const dotoci_path = OS.homedir() + '/.oci';

  
  CORE.debug('Creating .oci at', dotoci_path);
  FS.mkdirSync(dotoci_path, 0777);


  const api_key_path = dotoci_path + '/api_key.pem';
  CORE.debug('Saving API key to', api_key_path);
  FS.writeFileSync(api_key_path, oci_api_key);


  let config_file = '[DEFAULT]\n';
  config_file += 'user=${oci_user}\n';
  config_file += 'fingerprint=${oci_fingerprint}\n';
  config_file += 'key_file=${api_key_path}\n';
  config_file += 'tenancy=${oci_tenancy}\n';
  config_file += 'region=${oci_region}\n';
  const config_file_path = dotoci_path + '/config';
  
  CORE.debug('Saving config file to', config_file_path);
  FS.writeFileSync(config_file_path, config_file);
  

  
  CORE.debug('Downloading OCI install script');
  execSync('wget https://raw.githubusercontent.com/oracle/oci-cli/' + cli_version + '/scripts/install/install.sh');


  const bin_path = '/usr/local/bin';
  CORE.debug('Installing OCI', bin_path);
  execSync(`bash install.sh --accept-all-defaults --exec-dir ${bin_path}`);

  CORE.debug('Fixing permissions');
  execSync('oci setup repair-file-permissions --file ${config_file_path}');
  execSync('oci setup repair-file-permissions --file ${api_key_path}');
  
} catch (error) {
  CORE.setFailed(error.message);
}