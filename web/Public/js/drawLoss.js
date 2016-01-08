function drawLoss() {
  timeAxis = new Date(obj[0].TIME);

  $.each(obj[0].TIME,function(index, value) {
    timeAxis[index] = new Date();
    timeAxis[index].setTime(value * 1000);
    timeAxis[index] = timeAxis[index].toLocaleString();
  });

  $('#LOSS_container').highcharts({
    chart: {
      type: 'spline',
      renderTo: 'LOSS_container'
    },
    title: {
      text: '服务器网络连通率',
      x: -20 // center
    },
    subtitle: {
      text: 'Source: pi.catscarlet.com',
      x: -20
    },
    xAxis: {
      categories: timeAxis
      //categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
      title: {
        text: '连通率 (%)'
      },
      min: 0,
      max: 100,
      value: 0,
      width: 1,
      color: '#808080'

    },
    tooltip: {
      valueSuffix: '%'
    },
    legend: {
      enabled: true,
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      borderWidth: 0
    },
    plotOptions: {
      spline: {
        lineWidth: 2,
        states: {
          hover: {
            lineWidth: 5
          }
        },
        marker: {
          enabled: false
        },
        // pointInterval: 3600000, // one hour
        // pointStart: Date.UTC(2009, 9, 6, 0, 0, 0)
      }
    },
    /*
    series: [{
      //name: 'Tokyo',
      //name: obj.server_name,
      //data: obj.loss_percent
      //data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
      //data: window.obj[1].loss_percent
    }

                ,
                {
                    name: 'Bandwagon Host - Arizona',
                    data: MyYLOSS('198.35.46.1.json')
                }

]
*/
  });
};
