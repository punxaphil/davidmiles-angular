#!/usr/bin/env bash
docker stop davidmiles-angular-serve
docker rm davidmiles-angular-serve
docker container run --rm --name davidmiles-angular-serve -v $(pwd):/opt -w /opt --expose 4200 -p 4200:4200 teracy/angular-cli ng serve -aot -H 0.0.0.0
