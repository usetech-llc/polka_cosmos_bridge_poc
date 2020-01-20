const fs = require('fs');
const https = require('https')
const { ApiPromise, WsProvider } = require('@polkadot/api');

let api;

async function getBalance() {
  // The actual address that we will use
  const ADDR = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';

  // Retrieve the last timestamp
  const now = await api.query.timestamp.now();

  // Retrieve the account balance via the balances module
  const balance = await api.query.balances.freeBalance(ADDR);

  console.log(`${now}: balance ${balance}`);
}


async function main() {
  console.log("Bridge Relay Service Started");

  // Construct Polkadot JS API
  const wsProvider = new WsProvider('ws://localhost:9944');
  api = await ApiPromise.create({ provider: wsProvider });
  await api.isReady;

  // Get Balance
  await getBalance();


  console.log("Bridge Relay Service Stopped");
}

main().then(() => { process.exit() });
