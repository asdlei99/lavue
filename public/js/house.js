$(function(){
    lists_residential("北辰区");

   $("#residential").on("click", ".area-init", function() {
        if($(this).find("span.up").text() == "∧") {
            $(this).find("span.up").text("∨");
            $(this).siblings(".lists").find("ul").removeClass("show");
        }
        else {
            $(this).find("span.up").text("∧");
            $(this).siblings(".lists").find("ul").addClass("show");
        }
   });

   $(".area li").click(function() {
        let area = $(this).find("a").text();
        lists_residential(area);
        $(this).addClass("cur").siblings("li").removeClass("cur");
   });

});

function lists_residential(area) {
    $.ajax({
        url: "/areahouse",
        data: {area: area},
        success: function (data) {
            let datakeys = Object.keys(data).sort();

            let navhtml = "<ul class='nav'>";
            for(let w of datakeys) {
                navhtml += `<li><a href='#${w}'>${w}</a>`;
            }
            navhtml += `</ul>`;
            $(".nav").html(navhtml);

            let html = "";
            for(let i in datakeys) {
                let w = datakeys[i];
                html += `
                    <div class="area-house">
                        <div class="area-init" id="${w}">
                            <span>${w}</span>
                            <span class="up">${i==0?'∧':'∨'}</span>
                        </div>
                        <div class="lists">`;
                if(i == 0) {
                    html += `<ul class="show">`;
                }
                else {
                    html += `<ul>`;
                }


                for(let info of data[w]) {
                    let name = info['name'];
                    html += `<li><a href="javascript:showhistory(${info['id']}, '${name}')">${info['name']}</a></li>`;
                }

                html += `</ul> </div> </div>`;
            }

            $("#residential").html(html);
        }
    });
}

var chart = null;
function showhistory(id, name) {
    $.ajax({
        url: "/house",
        data: {rid: id},
        success: function(result) {
            $("#crawl_state").html("");
            if(result.state == 1) {
                let xdata = [], ydata = [];
                for(let d of result.data.data) {
                    xdata.push(d["year"] + "-" + d["month"]);
                    ydata.push(d["price"]);
                }


                chart = Highcharts.chart('chartx', {
                    title: {
                        text: `${name}历史均价`
                    },
                    subtitle: {
                        text: '数据来源：安居客'
                    },
                    xAxis: {
                        categories: xdata
                    },
                    yAxis: {
                        title: {
                            text: '价格(元)'
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle'
                    },
                    plotOptions: {
                        series: {
                            label: {
                                connectorAllowed: false
                            }
                        }
                    },
                    series: [{
                        name: '小区均价',
                        data: ydata
                    }],
                    responsive: {
                        rules: [{
                            condition: {
                                maxWidth: 500
                            },
                            chartOptions: {
                                legend: {
                                    layout: 'horizontal',
                                    align: 'center',
                                    verticalAlign: 'bottom'
                                }
                            }
                        }]
                    }
                });
            }
            else if(result.state == 0) {
                if(chart) {
                    chart.destroy();
                }

                let crawl_html = `
                    <p id="crawl_state">暂无该小区数据，是否进行爬取？</p>
                    <p class="text-right">
                        <button onclick="crawl_history(${id}, '${name}')">爬取</button>
                        <button onclick="$('#myModal').modal('hide');">取消</button>
                    </p>`;

                $("#chartx").html(crawl_html);
            }
        }
    });


    $("#myModal").modal("show");
}

function crawl_history(id, name) {
    $("#crawl_state").html("爬取中，请稍后...");
    $.ajax({
        url: '/crawl/' + name,
        data: {"_token": $("#_token").val()},
        type: 'post',
        timeout: 20000,
        success: function (data) {
            if(data.state == 1) {
                $("#crawl_state").html("爬取成功，重新加载中...");
                showhistory(id, name);
            }
        }
    })
}