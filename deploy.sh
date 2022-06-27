#!bin/bash

echo deploy start
  
[ -d ./modules ] && rm -rf ./modules

mkdir ./modules
cp -R node_modules ./modules

#if [ ! $1 == '' ]; then !!
if [ $# == 0 ]; then
    echo deploy1
    sls deploy    
elif [ $# == 1 ] && [ $1 == 'dev' ] || [ $1 == 'prod' ]; then
    echo deploy2
    sls deploy -s $1
elif [ $# == 1 ] && [ $1 != 'dev' ] && [ $1 != 'prod' ]; then
     echo deploy3
    sls deploy function -f $1
elif [ $# == 2 ]; then
     echo deploy4
    sls deploy function -f $2 -s $1
fi