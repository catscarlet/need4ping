<?php

return array(
'APP_DEBUG' => true,
'DB_TYPE' => 'mysql',
'DB_HOST' => 'localhost',
'DB_NAME' => 'need4ping',
'DB_USER' => 'root',
'DB_PWD' => 'root',
'DB_PORT' => '3306',
'DB_PREFIX' => '',
'DB_PARAMS' => array(\PDO::ATTR_CASE => \PDO::CASE_NATURAL), // 数据库连接参数，强制查询返回值大小写
);
