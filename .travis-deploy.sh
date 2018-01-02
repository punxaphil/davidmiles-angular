#!/usr/bin/env bash
echo "Branch is $TRAVIS_BRANCH"
if [ "$TRAVIS_BRANCH" == "master" ]; then
  export SSHPASS=$SSH_PASS
  sshpass -e rsync --archive --delete --chmod=Du=rwx,go=rx,Fu=rwx,og=rx "dist/" "$SSH_USER@ssh.davidmiles.se:/www/angular/"
fi
