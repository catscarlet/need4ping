<?php

namespace Home\Controller;

use Think\Controller;

class QuerydbController extends Controller
{
    public function Querydb()
    {
        $query_range = 360;   //最大查询范围
        $query = json_decode($_POST['query'], true);
        $serverList = $query['serverList'];
        $starttime = strtotime($query['starttime']);
        $endtime = strtotime($query['endtime']);
        foreach ($serverList as $id => $query) {
            $query_output[$id] = $this->query_db($query, $query_range, $starttime, $endtime);
        }
        $this->ajaxReturn($query_output);
    }

    public function query_db($q, $query_range, $starttime = null, $endtime = null)
    {
        $pingresult = M('pingresult');
        if ($starttime and $endtime) {
            $sql_array = $pingresult->where('server_name = "'.$q.'" and TIME between '.$starttime.' and '.$endtime)->order('TIME DESC')->limit($query_range)->select();
        } else {
            $sql_array = $pingresult->where('server_name = "'.$q.'"')->order('TIME DESC')->limit($query_range)->select();
        }

        $sql_count = count($sql_array);
        $i = min($query_range, $sql_count);
        foreach ($sql_array as $sql_array_id => $row) {
            $i = $i - 1;
            $query_DATA['TIME'][$i] = $row['TIME'];
            $query_DATA['loss_percent'][$i] = 100 - substr($row['loss_percent'], 0, -1);
            $query_DATA['rtt_avg'][$i] = round($row['rtt_avg']);

            $timeAxis = (string) $row['TIME'];
            $result[$timeAxis]['loss_percent'] = 100 - substr($row['loss_percent'], 0, -1);
            $result[$timeAxis]['rtt_avg'] = round($row['rtt_avg']);
        }

        //file_put_contents('/tmp/tmp.log', "$result:\n".print_r($result, true)."\n\n", FILE_APPEND);

        $pinglist = M('pinglist');
        $data = $pinglist->where('server_name = '."\"$q\"")->select();
        $pinglist_alias = $data[0]['alias_name'];
/*
        ksort($query_DATA['TIME']);
        ksort($query_DATA['loss_percent']);
        ksort($query_DATA['rtt_avg']);
*/

        $query_result['server_name'] = $q;
        $query_result['alias_name'] = $pinglist_alias;
        $query_result['query_data'] = $result;

        file_put_contents('/tmp/tmp.log', "$query_data:\n".print_r($query_data, true)."\n\n", FILE_APPEND);

        return $query_result;
    }
}
