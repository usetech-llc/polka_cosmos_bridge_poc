# make install

nsd init node1 --chain-id nameservice

nscli keys add jack
nscli keys add bob

# Add both accounts, with coins to the genesis file
nsd add-genesis-account $(nscli keys show jack -a) 1000000000cosmodot,100000000stake
nsd add-genesis-account $(nscli keys show bob -a) 100000000stake

# Configure your CLI to eliminate need for chain-id flag
nscli config chain-id nameservice
nscli config output json
nscli config indent true
nscli config trust-node true

nsd gentx --name jack
nsd collect-gentxs
nsd validate-genesis
nsd start
