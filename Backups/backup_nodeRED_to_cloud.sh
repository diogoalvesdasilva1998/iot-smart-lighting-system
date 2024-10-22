#!/bin/bash

#Define source directories
NODE_RED_SRC_DIR="/home/diogoalvessilva/.node-red"
INFLUX_RED_SRC_DIR="/var/lib/influxdb"
CONFIG_DIR="etc"

#Define destination directory in cloud storage
CLOUD_DIR="clone:Raspberry_Backups"

CURRENT_DATE=$(date +%d%m%Y)
rclone sync $NODE_RED_SRC_DIR $CLOUD_DIR/node-red-${CURRENT_DATE} --create-empty-src-dirs --exclude node_modules/**

echo "Cloud backup completed on $(date)" >> /home/diogoalvessilva/logs/backup.log
