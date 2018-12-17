#!/usr/bin/env bash
echo "Attempting to check for redis and rabbitmq"
./wait-for-it.sh -s -t 300 rabbitmq:15672 && ./wait-for-it.sh -s -t 300 rabbitmq:15672 redis:6379 -- $@
