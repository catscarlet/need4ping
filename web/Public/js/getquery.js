$(document).ready(function() {
  $('#submit').click(function() {
    //console.log($('#starttime').prop('value'));
    //console.log($('#endtime').prop('value'));
    //getquery();
    query();
    //console.log('Get Json ServerList: ' + getServerList());
  });});

var xmlHttp;

function query() {
  var queryRequest = new Object();
  queryRequest.serverList = getServerList();
  queryRequest.starttime = 0;
  queryRequest.endtime = 1;
  //console.log(queryRequest);
  queryRequestJson = JSON.stringify(queryRequest);
  //console.log(queryRequestJson);

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
      //console.log(index + ' The ' + $(element).prop('value') + ' is ' + $(element).prop('checked'));
      serverList.push($(element).prop('value'));
    }
  });
  return serverList;
}
