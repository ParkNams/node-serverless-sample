#!bin/bash

echo deploy start
  
[ -d ./modules ] && rm -rf ./modules

mkdir ./modules
cp -R node_modules ./modules

#if [ ! $1 == '' ]; then
if [ $# == 0 ]; then
    sls deploy    
else
    sls deploy -s $1
fi