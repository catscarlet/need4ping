$(document).ready(function() {
  starttime = new Date();
  endtime = new Date();
  starttime.setHours(starttime.getHours() - 2);
  $('#starttime').prop('value', starttime.getFullYear() + '-' + (starttime.getMonth() + 1) + '-' + starttime.getDate() + ' ' + starttime.getHours() + ':' + starttime.getMinutes());
  $('#endtime').prop('value', endtime.getFullYear() + '-' + (endtime.getMonth() + 1) + '-' + endtime.getDate() + ' ' + endtime.getHours() + ':' + endtime.getMinutes());

  $('#datetimepicker1').datetimepicker({
    'autoclose': true,
    'pickerPosition': 'top-right',
    'format': 'yyyy-mm-dd hh:ii',
    'todayBtn': true
  });

  $('#datetimepicker2').datetimepicker({
    'autoclose': true,
    'pickerPosition': 'top-right',
    'format': 'yyyy-mm-dd hh:ii',
    'todayBtn': true
  });

  $('#submit').click(function() {
    query();
  });});

function query() {
  var queryRequest = new Object();
  queryRequest.serverList = getServerList();
  starttime = $('#starttime').prop('value');

  endtime = $('#endtime').prop('value');

  console.log(starttime);
  console.log(endtime);

  queryRequest.starttime = starttime;
  queryRequest.endtime = endtime;
  queryRequestJson = JSON.stringify(queryRequest);
  console.log(queryRequestJson);
  var url = 'index.php/home/Querydb/Querydb';
  $.ajax({
    type: 'post',
    url: url,
    dataType: 'json',
    data: {query: queryRequestJson},
    success: function(msg) {
      console.log(msg);
      if (msg[0].TIME) {
        window.obj = msg;
        drawLoss();
        drawLatency();
        RefreshChart();
      } else {
        console.log('No result avaliable');
      }
    }
  });
}

function getServerList() {
  var serverList = new Array() ;
  $('.serverList').each(function(index, element) {
    if ($(element).prop('checked')) {
      serverList.push($(element).prop('value'));
    }
  });
  return serverList;
}
