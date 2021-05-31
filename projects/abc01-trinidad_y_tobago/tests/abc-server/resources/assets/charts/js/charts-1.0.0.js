

/** Singleton **/

var Charts = (function()
{
	/*** private ***/

    var _refresh  = null;
    var _interval = -1;
	var _log = true;


	function log(msg)
    {
        if (_log)
            //alert("[Charts] " + msg);
            console.log("[Charts] " + msg);
    }


    function getServiceData(service, params, callback)
    {
        var url = Ajax.getUrlService(service);

        //alert("url: " + url);

        Ajax.post(true, url, params, function(responseBean)
        {
            if ($.isFunction(callback))
            {
                var responseBeanData = responseBean.data;

                if (responseBeanData != null)
                    callback( responseBeanData );
                 else
                    callback( null );
            }

        }, function(responseBean)
        {
            // error
            try { alert(responseBean.messages[0].message); } catch(e){}

            if (_refresh != null)
                clearInterval(_refresh);

            if ($.isFunction(callback))
                callback( null );
        });
    }


	function getFilter()
    {
        var filter = { initialDate : null, finalDate : null };

        filter.initialDate = Utils.getValue("initialDate");
        filter.finalDate   = Utils.getValue("finalDate");

        return filter;
    }


    //
    // Pie
    //

    function drawPieChart(containerId, titleText, subtitleText, seriesData, donutsSize, enabled3D)
    {
        var chart = new Highcharts.Chart(
        {
            credits:
            {
                enabled: false
            },

            chart:
            {
                renderTo: containerId,
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',

                options3d:
                {
                    enabled: enabled3D,
                    alpha: 45,
                    beta: 0
                }
            },
            title:
            {
                text: titleText,
                align: 'center',
                style: { "color": "#333333", "fontSize": "16px" }
            },
            subtitle:
            {
                text: subtitleText,
                align: 'center',
                style: { "color": "#333333", "fontSize": "12px" }
            },
            tooltip:
            {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions:
            {
                pie:
                {
                    innerSize: donutsSize,
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels:
                    {
                        enabled: true,
                        //format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        format: '{point.name}',
                        style:
                        {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },

            series: seriesData
        });
    }



    function doDrawCharts()
    {
        //alert("doDrawCharts");

        Ajax.authorization(function()
        {
            var params = getFilter();

            getServiceData("/charts/pie", params, function(chartData)
            {
                if (chartData != null)
                {
                    var donutsSize = 100;
                    var enabled3D  = true;
                    drawPieChart('pie-chart', chartData.title, chartData.subtitle, chartData.series, donutsSize, enabled3D);
                }
            });

        });
    }



    /*** public ***/

    return {


        getInterval : function()
        {
            return _interval;
        },

        setInterval : function(interval)
        {
            _interval = interval;
        },

        drawCharts : function()
        {
            doDrawCharts();
        }

    };


})();

