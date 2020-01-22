# Substrate <> Cosmos Bridge POC

Current state is a one-side bridge that allows locking DOTs on Substrate side and releasing CosmoDOT on Cosmos side to a certain address.

Here is the video demonstrating how this bridge pre-POC works:

https://github.com/usetech-llc/polka_cosmos_bridge_poc/blob/master/substrate_cosmos_bridge.mp4

## Starting Substrate

```
git clone https://github.com/paritytech/substrate && cd substrate
cargo build
cargo run --release -- --dev
```

## Starting Cosmos

Make sure you have go 1.13 installed.

```
cd cosmos
make install
./setup.sh
```

After node starts, get the Bob's address with command line utility and copy to `node/app.js`

## Starting Relay

Make sure Bob's cosmos address and Relay address in Substrate are updated. Relay address doesn't have to be any special address, it only needs to receive DOTs (or DEVs, or whatever network currency is).

```
cd node
npm install
node app.js
```