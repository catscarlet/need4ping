#!/bin/bash
needforping_DIR=/var/www/need4ping/

needforping_Shell_DIR=$needforping_DIR/web/Public/shell
. /$needforping_Shell_DIR/needforping.conf


TMP_DIR=/$needforping_Shell_DIR/pingresult
line=$1
OUTPUTTXT=$TMP_DIR/ping_$line.txt
OUTPUTTMP=$TMP_DIR/ping_$line.tmp
OUTPUTFORJS=$TMP_DIR/$line.json

  echo "" > $OUTPUTTXT
  SERVER="The server is $1 SERVER"
  echo $SERVER >> $OUTPUTTXT
  DATETIME=`date "+%Y-%m-%d %H:%M"`
  DATETIME_UNIX=`date -d "$DATETIME" +%s`
  echo "DATETIME is $DATETIME, UNIX_TIME is $DATETIME_UNIX" >> $OUTPUTTXT

  ping -c $PINGCOUNT $line |tail -n 3 >> $OUTPUTTXT

  $needforping_Shell_DIR/readline.sh $OUTPUTTXT $OUTPUTTMP
