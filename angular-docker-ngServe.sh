#!/usr/bin/env bash
docker container run --rm -v $(pwd):/opt -w /opt --expose 4200 -p 4200:4200 teracy/angular-cli ng s -H 0.0.0.0
