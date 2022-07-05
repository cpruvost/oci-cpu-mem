# Github Action (Javascript) for Oracle Cloud Infrastructure CLI

With Github Action for Oracle Cloud Infrastructure CLI, you can automate your workflow by executing OCI CLI commands to manage OCI resources inside of an Action.

## Inputs

### `user`

**Required** The oci id of the user. Ex `"ocid1.user.oc1..aaaaaaaaxxx........."`.

### `fingerprint`

**Required** The fingerprint of API key. Ex `"4f:90:09:d7:2a:ea:81........."`.
### `tenancy`

**Required** The tenancy id of OCI. Ex `"ocid1.tenancy.oc1..aaaaaaaahrs4avamaxiscouye........"`.
### `region`

**Required** The region id of OCI. Ex `"eu-frankfurt-1"`.
### `api_key`

**Required** The api_key to access OCI. Ex `"-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEAyCt82bSAeSWBtwK1razNApgDVvpVD1IfHUti+0n9X2ZTYb9k........"`.
### `version`

**Required** The OCI CLI version. Ex `"master for last version, v3.10.5, v2.23.0, ...Note : default = master. For the moment whatever the version you choose at the end you will have the last version. I am investigating on that but not sure there is a solution"`.

# Example usage
```yaml
- name: Install oci-cli
  uses: cpruvost/oci-cli-action@v1.0.3
  with:
    user: "${{ secrets.OCI_USER }}"
    fingerprint: "${{ secrets.OCI_FINGERPRINT }}"
    tenancy: "${{ secrets.OCI_TENANCY }}"
    region: "${{ secrets.OCI_REGION }}"
    api_key: |
      ${{ secrets.OCI_API_KEY }}
    version: master  
```
