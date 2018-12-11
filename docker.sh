#!/bin/bash
if [ $1 == 'dev' ]
then
    docker build -f Dockerfile.dev -t dev . && docker-compose -f ./docker-compose.dev.yml up -d
else
    docker build -f Dockerfile.prod -t prod . && docker-compose -f ./docker-compose.prod.yml up -d
fi