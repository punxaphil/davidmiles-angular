#!/usr/bin/env bash
mkdir thumb
for i in $(ls)
do
echo "Processing image $i ..."
convert -thumbnail 100 $i thumb/$i
done