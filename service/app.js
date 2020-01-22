const BigNumber = require('bignumber.js');
const fs = require('fs');
const https = require('https')
const { ApiPromise, WsProvider } = require('@polkadot/api');
const shell = require('shelljs');

let api;

const relayLockPolka = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
const bobCosmos = 'cosmos18zc547c50kpcvpcjny8w4xm0sh09qdj5mu5u7m';

let previousBalance = null;

async function relayBalanceLock(amount) {
  shell.exec(`cd ../cosmos && ./calltx.sh ${amount} ${bobCosmos}`);
  shell.exec(`sleep 1`);
  shell.exec(`clear`);
}

async function getPolkaBalance() {
  // The actual address that we will use
  const ADDR = relayLockPolka;

  // Retrieve the account balance via the balances module
  const balance = new BigNumber(await api.query.balances.freeBalance(ADDR));

  // first time, no change
  if (previousBalance == null) {
    previousBalance = balance;
  } else if (!previousBalance.isEqualTo(balance)) {
    const diff = balance.minus(previousBalance);
    process.stdout.write(`\n`);
    console.log(`Balance lock detected: ${diff.div(1e12).toFixed()} DEV\n`);
    await relayBalanceLock(diff.div(1e12).toFixed());
    
    previousBalance = balance;
  }

  process.stdout.write(`\rRelay lock balance on Polkadot: ${balance.div(1e12).toFixed()}, waiting for balance change...            `);
}

async function mainLoopHandler() {
  // Get Balance
  await getPolkaBalance();

  setTimeout(mainLoopHandler, 1000);
}

async function mainLoop() {

  mainLoopHandler();

  // Return promise that never resolves
  return new Promise(function(resolve, reject) {
  });
}

async function main() {
  console.log("Bridge Relay Service Started");

  // Construct Polkadot JS API
  const wsProvider = new WsProvider('ws://localhost:9944');
  api = await ApiPromise.create({ provider: wsProvider });
  await api.isReady;

  console.log('\n');
  await mainLoop();

  console.log("Bridge Relay Service Stopped");
}

main().then(() => { process.exit() });
