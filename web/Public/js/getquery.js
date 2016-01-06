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
  var serverList = getServerList();
  var url = 'index.php/home/Querydb/Querydb?';
  $.ajax({
    type: 'get',
    url: url,
    dataType: 'json',
    content: serverList,
    success: function(msg) {
      console.log(msg);
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
  return JSON.stringify(serverList);
}

function getquery() {
  var value = GetCheckbox();
  var url = 'index.php/home/Querydb/Querydb?';
  xmlHttp = GetXmlHttpObject();
  if (xmlHttp == null) {
    alert('Browser does not support HTTP Request');
    return;
  }
  url = GroupQueryUrl(url, value);
  xmlHttp.onreadystatechange = stateChanged;
  xmlHttp.open('GET', url, true);
  xmlHttp.send(null);
}

function GetCheckbox() {
  checkbox = document.getElementsByName('q[]');
  var value = new Array();
  for (i = 0, j = 0 ; i < checkbox.length ; i++) {
    if (checkbox[i].checked) {
      value[j] = checkbox[i].value;
      j++;
    }
  }
  return value;
}



function GroupQueryUrl(url, value) {
  for (i = 0; i < value.length ; i++) {
    url = url + '&q[]=' + value[i];
  }
  url = encodeURI(url + '&sid=' + Math.random());
  return (url);
}

function GetXmlHttpObject() {
  var xmlHttp = null;
  try {
    // Firefox, Opera 8.0+, Safari
    xmlHttp = new XMLHttpRequest();
  } catch (e) {
    //Internet Explorer
    try {
      xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
    } catch (e) {
      xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
  }
  return xmlHttp;
}

function stateChanged() {
  if (xmlHttp.readyState == 4 || xmlHttp.readyState == 'complete') {

    window.obj = eval('(' + xmlHttp.responseText + ')');
    drawLoss();
    drawLatency();
    RefreshChart();
  }

}
