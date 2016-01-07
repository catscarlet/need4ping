$(document).ready(function() {
  $('#submit').click(function() {
    query();
  });});

function query() {
  var queryRequest = new Object();
  queryRequest.serverList = getServerList();
  starttime = new Date($('#starttime').prop('value'));
  endtime = new Date($('#endtime').prop('value'));
  queryRequest.starttime = starttime.getTime() / 1000;
  queryRequest.endtime = endtime.getTime() / 1000;
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
