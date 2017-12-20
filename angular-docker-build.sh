#!/usr/bin/env bash
docker container run --rm -v $(pwd):/opt -w /opt teracy/angular-cli ng build -op docs
