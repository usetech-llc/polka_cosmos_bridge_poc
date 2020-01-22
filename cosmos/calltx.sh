#!/usr/bin/expect
set pass "12345678\n"
set amount [lindex $argv 0];

spawn nscli tx nameservice forward ${amount}cosmodot cosmos142f0ytmcqv3htm6mz7ysds7xjndrxjj97vpdcn --from jack --chain-id nameservice

expect "y/N"
send "y\n"
expect "Password to sign with"
send "$pass"
#expect "asdfsadf"
sleep 3
