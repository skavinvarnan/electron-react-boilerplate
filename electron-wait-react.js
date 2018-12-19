/**
 * Created by Kavin Varnan on 2018-12-17
 */

const net = require('net');
const port = process.env.PORT ? (process.env.PORT - 100) : 5000;

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new net.Socket();

let startedElectron = false;

const tryConnection = () => client.connect({port: port}, () => {
    client.end();
    if(!startedElectron) {
      console.log('starting electron');
      startedElectron = true;
      const exec = require('child_process').exec;
      // Starting electron
      exec('electron .');
    }
  }
);

tryConnection();

client.on('error', (error) => {
  console.log("Waiting for react to start");
  setTimeout(tryConnection, 2000);
});
