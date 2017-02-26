function RefreshChart() {
    var chart1 = $('#LATENCY_container').highcharts();
    var chart2 = $('#LOSS_container').highcharts();
    i = 0;
    do {
        console.log(obj[i].query_data);
        var rtt_avg = [];
        var loss_percent = [];;
        $.each(obj[i].query_data, function(key, value) {
            rtt_avg.push(value.rtt_avg);
            loss_percent.push(value.loss_percent);
        });
        console.log(rtt_avg);
        console.log(loss_percent);
        chart1.addSeries({
            name: obj[i].alias_name,
            data: rtt_avg
        });
        chart2.addSeries({
            name: obj[i].alias_name,
            data: loss_percent
        });
        i++;
    } while (obj[i]);
}
