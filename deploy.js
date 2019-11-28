const NodeSsh = require('node-ssh')
const fs = require('fs')
const deploy = JSON.parse(fs.readFileSync('./deploy.json'))
const ssh = new NodeSsh()
ssh.connect({
  host: deploy.host,
  username: deploy.username,
  password: deploy.password,
  port: deploy.port
}).then(function () {
  ssh.putDirectory(deploy.source, deploy.destination, {
    recursive: true,
    tick: function(localPath, remotePath, error) {
      if (error) {
        console.error(error)
      } else {
        console.log(`${localPath} > ${remotePath} ... OK`)
      }
    }
  }).then(status => {
    console.log(`directory transfer ${status ? 'succeeded' : 'failed'}`)
    ssh.dispose()
  })
})
