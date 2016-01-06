$(document).ready(function() {
  $('#submit').click(function() {
    query();
  });});

var xmlHttp;

function query() {
  var queryRequest = new Object();
  queryRequest.serverList = getServerList();
  queryRequest.starttime = $('#starttime').prop('value');
  queryRequest.endtime = $('#endtime').prop('value');
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
