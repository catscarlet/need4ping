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
        $starttime = $query['starttime'];
        $endtime = $query['endtime'];
        file_put_contents('/tmp/tmp.log', "Querydb:\n".print_r($serverList, true)."\n\n", FILE_APPEND);
        foreach ($serverList as $id => $query) {
            $query_output[$id] = query_db($query, $query_range);
        }
        $this->ajaxReturn($query_output);
    }
}

        function query_db($q, $query_range,$starttime = null ,$endtime =null)
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
            }

            $pinglist = M('pinglist');
            $data = $pinglist->where('server_name = '."\"$q\"")->select();
            $pinglist_alias = $data[0]['alias_name'];

         /* 因为sql查询是DESC的，所以要根据键值重新排序，不然坐标轴的时间会变成降序 */
            ksort($query_DATA['TIME']);
            ksort($query_DATA['loss_percent']);
            ksort($query_DATA['rtt_avg']);

         /* 将查询的关键词与查询结果合并*/
            $query_data = array('server_name' => $q);
            $query_data_alias = array('alias_name' => $pinglist_alias);
            $query_data = array_merge($query_data, $query_data_alias, $query_DATA);

            return $query_data;
        }
