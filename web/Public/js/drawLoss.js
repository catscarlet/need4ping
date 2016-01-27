function drawLoss() {
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
      categories: timeAxisLocaleString
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
        }
      }
    }
  });
};
