function dashboard(){
	dashboard_ingresos_ultimo_anio_disciplina();
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function dashboard_ingresos_ultimo_anio_disciplina(){
	
	ws_datos = ws('sp_dashboard_ingresos_mensuales_disciplina','');
	console.log(ws_datos);


	Highcharts.chart('div_graf_ingreso_disciplinas', {
	    chart: {
	        type: 'line'
	    },
	    title: {
	        text: ''
	    },
//	    subtitle: {
//	        text: 'Source: WorldClimate.com'
//	    },
	    xAxis: {
	        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	    },
	    yAxis: {
	        title: {
	            text: 'INGRESOS'
	        }
	    },
	    plotOptions: {
	        line: {
	            dataLabels: {
	                enabled: true
	            },
	            enableMouseTracking: false
	        }
	    },
	    series: [{
	        name: 'Tokyo',
	        data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
	    }, {
	        name: 'London',
	        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
	    }]
	});	
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////