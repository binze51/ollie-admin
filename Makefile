.PHONY: help

help:
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

VERSION := $(shell git describe --tags --always)
# VERSION:=v1.1.1
GIT_COMMIT := $(shell git rev-parse --short HEAD)
REGISTRY := ccr.ccs.tencentyun.com
NS_GROUP := binze
DOCKERFILE := Dockerfile
service := ollie-admin

### image build push ###
imagebuildpublish: ## [PODMAN BUIDL AND PUSH] ,example: `make imagebuildpublish`
	@buf generate
	@echo 'publish $(VERSION) to $(REGISTRY)'
	@podman login ccr.ccs.tencentyun.com --username=100012015939
	@podman build -f $(DOCKERFILE) --build-arg SERVICE=$(service) --build-arg VERSION=$(VERSION) --build-arg GIT_COMMIT=$(GIT_COMMIT) -t $(REGISTRY)/$(NS_GROUP)/$(service):$(VERSION) .
	@podman push $(REGISTRY)/$(NS_GROUP)/$(service):$(VERSION)