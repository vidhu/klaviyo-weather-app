#!/usr/bin/env bash
echo "Attempting to connect to mongo db"
echo "Attempting to connect to rabbitMQ"
./wait-for-it.sh -s -t 300 db:27017 && ./wait-for-it.sh -s -t 300 rabbitmq:15672 -- $@
