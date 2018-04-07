#!/bin/bash
echo "Branch is $TRAVIS_BRANCH"
subdir=""
if [ "$TRAVIS_BRANCH" != "master" ]; then
  subdir="beta-$TRAVIS_BRANCH"
fi
export SSHPASS=$SSH_PASS
sshpass -e rsync --archive --delete --exclude /www/beta-* --exclude .htaccess --chmod=Du=rwx,go=rx,Fu=rwx,og=rx "dist/" "$SSH_USER@ssh.davidmiles.se:/www/$subdir"
