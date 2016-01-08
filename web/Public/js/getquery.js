$(document).ready(function() {

  $('#starttime').prop('value', new Date().toISOString());

  $('#endtime').prop('value', new Date().toISOString());

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
  starttime = Date.parse($('#starttime').prop('value'));

  endtime = Date.parse($('#endtime').prop('value'));

  console.log(starttime);
  console.log(endtime);

  queryRequest.starttime = starttime / 1000;
  queryRequest.endtime = endtime / 1000;
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
      window.obj = msg;
      drawLoss();
      drawLatency();
      RefreshChart();
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
