make install

nsd init node1 --chain-id namechain

nscli keys add jack
nscli keys add alice

# Add both accounts, with coins to the genesis file
nsd add-genesis-account $(nscli keys show jack -a) 1000nametoken,100000000stake
nsd add-genesis-account $(nscli keys show alice -a) 1000nametoken,100000000stake

# Configure your CLI to eliminate need for chain-id flag
nscli config chain-id namechain
nscli config output json
nscli config indent true
nscli config trust-node true

nsd gentx --name jack
