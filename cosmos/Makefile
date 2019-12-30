PACKAGES=$(shell go list ./... | grep -v '/simulation')

VERSION := $(shell echo $(shell git describe --tags) | sed 's/^v//')
COMMIT := $(shell git log -1 --format='%H')

ldflags = -X github.com/cosmos/cosmos-sdk/version.Name=SubstrateCosmosBridge \
	-X github.com/cosmos/cosmos-sdk/version.ServerName=scbd \
	-X github.com/cosmos/cosmos-sdk/version.ClientName=scbcli \
	-X github.com/cosmos/cosmos-sdk/version.Version=$(VERSION) \
	-X github.com/cosmos/cosmos-sdk/version.Commit=$(COMMIT) 

BUILD_FLAGS := -ldflags '$(ldflags)'

include Makefile.ledger
all: install

install: go.sum
		go install -mod=readonly $(BUILD_FLAGS) ./cmd/scbd
		go install -mod=readonly $(BUILD_FLAGS) ./cmd/scbcli

go.sum: go.mod
		@echo "--> Ensure dependencies have not been modified"
		GO111MODULE=on go mod verify

test:
	@go test -mod=readonly $(PACKAGES)