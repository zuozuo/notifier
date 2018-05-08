const { spawn } = require('child_process');

function create(name) {
  let success = true;
  console.log(`psql postgres -c 'create database ${name}'`);
  const command = spawn('psql', ['postgres', '-c', `create database ${name};`]);

  command.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  command.stderr.on('data', (data) => {
    success = false
    console.log(`stderr: ${data}`);
  });

  command.on('close', (code) => {
    if (success) {
      console.log(`database ${name} created successfully`);
    }
  });
}

module.exports = { create }
