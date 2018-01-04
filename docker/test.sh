#!/usr/bin/env bash
docker stop davidmiles-angular-test
docker rm davidmiles-angular-test
#docker run -u $(id -u) --rm --name davidmiles-angular-test -v "$PWD":/app --expose 49152 -p 49152:49152 trion/ng-cli-e2e npm run e2e:watch
docker run -it -u $(id -u) --rm --name davidmiles-angular-test -v "$PWD":/app trion/ng-cli-e2e bash
