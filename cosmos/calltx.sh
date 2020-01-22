#!/usr/bin/expect
set pass "12345678\n"
set amount [lindex $argv 0];
set address [lindex $argv 1];

spawn nscli tx nameservice forward ${amount}cosmodot ${address} --from jack --chain-id nameservice

expect "y/N"
send "y\n"
expect "Password to sign with"
send "$pass"
#expect "asdfsadf"
sleep 3
