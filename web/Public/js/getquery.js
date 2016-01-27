$(document).ready(function() {
  starttime = new Date();
  endtime = new Date();
  starttime.setHours(starttime.getHours() - 2);
  $('#starttime').prop('value', starttime.getFullYear() + '-' + (starttime.getMonth() + 1) + '-' + starttime.getDate() + ' ' + starttime.getHours() + ':' + starttime.getMinutes());
  $('#endtime').prop('value', endtime.getFullYear() + '-' + (endtime.getMonth() + 1) + '-' + endtime.getDate() + ' ' + endtime.getHours() + ':' + endtime.getMinutes());

  $('#query_range_checkbox').click(function() {
    if ($('#query_range_checkbox').prop('checked')) {
      $('.query_range_input').removeAttr('disabled');
    } else {
      $('.query_range_input').attr('disabled','disabled');
    }
  });

  $('#datetimepicker1').datetimepicker({
    'autoclose': true,
    'pickerPosition': 'top-right',
    'format': 'yyyy-mm-dd hh:ii',
    'todayBtn': true,
    'todayHighlight': true,
    'minuteStep': 2
  });

  $('#datetimepicker2').datetimepicker({
    'autoclose': true,
    'pickerPosition': 'top-right',
    'format': 'yyyy-mm-dd hh:ii',
    'todayBtn': true,
    'todayHighlight': true,
    'minuteStep': 2
  });

  $('#submit').click(function() {
    query();
  });
});

function query() {
  var queryRequest = new Object();
  queryRequest.serverList = getServerList();

  queryTimeRange = $('#query_range_checkbox').prop('checked');
  if (queryTimeRange) {
    starttime = $('#starttime').prop('value');
    endtime = $('#endtime').prop('value');
  } else {
    starttime = new Date();
    endtime = new Date();
    starttime.setHours(starttime.getHours() - 2);
  }

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
    data: {
      query: queryRequestJson
    },
    success: function(msg) {
      console.log(msg);
      timeAxisAdjust(msg);
      if (true) {
        window.obj = msg;
        drawLoss();
        drawLatency();
        RefreshChart();
      } else {
        alert('No result avaliable');
        console.log('No result avaliable');
      }
    }
  });
}

function timeAxisAdjust(msg) {
  console.log(Date.parse(starttime));
  console.log(Date.parse(endtime));
  timeAxisStart = Math.floor(Date.parse(starttime) / 1000 / 120) * 120 * 1000;

  timeAxisEnd = Math.floor(Date.parse(endtime) / 1000 / 120) * 120 * 1000;

  console.log(timeAxisStart);
  console.log(timeAxisEnd);
  var x = 0;
  timeAxis = new Object();
  timeAxisLocaleString = new Object();
  for (timeAxis[0] = timeAxisStart; timeAxis[x] < timeAxisEnd;) {
    x++;
    timeAxis[x] = timeAxis[x - 1] + 120000;
    timeAxisLocaleString[x] = Date(timeAxis[x]).toLocaleString();
  }
  console.log(timeAxisLocaleString);

  $.each(timeAxis,function(x, timeAxisX) {
    $.each(msg,function(timeIndex, queryResult) {
      //console.log(queryResult.query_data);
      //console.log(timeAxisX + ':' + queryResult.query_data[timeAxisX]);
      if (queryResult.query_data[timeAxisX]) {

      }
    });



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
