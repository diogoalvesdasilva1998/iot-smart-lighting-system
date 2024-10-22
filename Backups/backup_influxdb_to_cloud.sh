#!/bin/bash

BACKUP_PATH="/home/diogoalvessilva/Documents/Backups/InfluxDB"
TIMESTAMP=$(date +"%Y%m%d%H%M%S")
DATABASE="system_data"

CURRENT_DATE=$(date +%d%m%Y)

#Cloud destination
CLOUD_DIR="clone:Raspberry_Backups/InfluxDB"

#Create backup directory if it doesn't exist
#mkdir -p $BACKUP_PATH

#Backup the influx DB
influxd backup -portable -database $DATABASE $BACKUP_PATH/$DATABASE_$TIMESTAMP

#Send backups to cloud
rclone sync $BACKUP_PATH $CLOUD_DIR/influxdb-${CURRENT_DATE} --create-empty-src-dirs

#Remove backups older than 30 days
find $BACKUP_PATH -type f -mtime +7 -name "*.tar.gz" -exec rm {} \;
