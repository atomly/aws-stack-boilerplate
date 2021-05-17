#!/bin/bash

echo "Starting replica set initialize"
until mongo --host local_mongodb --port 27017 --eval "print(\"waited for connection\")"
do
    sleep 2
done
echo "Connection finished"
echo "Creating replica set"
mongo --host local_mongodb --port 27017 <<EOF
rs.initiate()
EOF
echo "replica set created"
