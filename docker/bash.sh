#!/usr/bin/env bash
docker container run -it --rm -v $(pwd):/opt -w /opt teracy/angular-cli bash
