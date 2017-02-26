#!/bin/bash
needforping_DIR=/var/www/need4ping

needforping_Shell_DIR=$needforping_DIR/web/Public/shell
. $needforping_Shell_DIR/needforping.conf
TMP_DIR=$needforping_Shell_DIR/pingresult

    i=0
MYSQL_COMMAND="SELECT server_name FROM $DB_PREFIX$DB_NAME.pinglist ;"
mysql -u$DB_USER -p$DB_PWD -e "$MYSQL_COMMAND" | while read server_name;
  do
    if [ $i -ne 0 ] ;then
    $needforping_Shell_DIR/goping.sh $server_name &
    fi
    i=`expr $i + 1`
  done
