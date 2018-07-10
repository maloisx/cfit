function dashboard(){
	dashboard_ingresos_ultimo_anio_disciplina();
	dashboard_clientes_activos();
	dashboard_membresias_x_vencer();
	dashboard_deudas_x_cobrar_resumen();
	 dashboard_ingreso_del_dia_resumen();
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function dashboard_ingresos_ultimo_anio_disciplina(){
	
	ws_datos = ws('sp_dashboard_ingresos_mensuales_disciplina','');
//	console.log(ws_datos);
	var v_categorias = [];
	var v_series_cab = [];
	var v_series = []; 
	for(var i = 0 ; i< ws_datos.length ; i++){
		v_categorias.push(ws_datos[i]['fecha']);
		v_series_cab.push(ws_datos[i]['nom_disciplina']);
	}
	
	v_categorias = jQuery.unique( v_categorias );
	v_series_cab = jQuery.unique( v_series_cab );
	
	for(var j = 0 ; j< v_series_cab.length ; j++){
		var ns = v_series_cab[j];
		var v_series_data = [];
		
		for(var k = 0 ; k< v_categorias.length ; k++){
			var c = v_categorias[k];
			var exist = false;
			var val = null;
			for(var i = 0 ; i< ws_datos.length ; i++){
				var cx = ws_datos[i]['fecha'];
				var tx = ws_datos[i]['nom_disciplina'];
				if(ns == tx && c == cx){
					val = parseFloat(ws_datos[i]['ingresos']);
					exist = true;
					break;				
				}
			}
			v_series_data.push(val);
		}
		

		var v_serie_item = [];
		v_serie_item['name'] = ns;
		v_serie_item['data'] = v_series_data;
		
		v_series.push(v_serie_item);		
	}
		
//	console.log(v_categorias);
//	console.log(v_series_cab);
//	console.log(v_series);
		
	Highcharts.chart('div_graf_ingreso_disciplinas', {
	    chart: {
			zoomType: 'x'
	    },
	    title: {
	        text: ''
	    },
//	    subtitle: {
//	        text: 'Source: WorldClimate.com'
//	    },
	    xAxis: {
	        categories: v_categorias
	    },
	    yAxis: {
	        title: {
	            text: 'INGRESOS'
	        },
	        showLastLabel: true
	    },
	    tooltip: {
	    	 shared: true,
	         crosshairs: true
	    },
	    plotOptions: {
	        line: {
	            dataLabels: {
	                //enabled: true
	            },
	            enableMouseTracking: true
	        }
	    },
	    series: v_series
	});	
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function dashboard_clientes_activos(){

	
	ws_datos = ws('sp_dashboard_clientes_activos_resumen','');
	var v_data = [];
	for(var i = 0 ; i< ws_datos.length ; i++){
		var item = {name:ws_datos[i]['name'] , y: parseInt(ws_datos[i]['y']) };
		v_data.push(item);
	}
	Highcharts.chart('div_graf_clientes_activos', {
	    chart: {
	        plotBackgroundColor: null,
	        plotBorderWidth: null,
	        plotShadow: false,
	        type: 'pie'
	    },
	    title: {
	        text: ''
	    },
	    tooltip: {
	        pointFormat: '{series.name}: <b>{point.y} ({point.percentage:.1f} %)</b>'
	    },
	    plotOptions: {
	        pie: {
	            allowPointSelect: true,
	            cursor: 'pointer',
	            dataLabels: {
	                enabled: true,
//	                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
	                format: '{point.y}',
	                style: {
	                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	                }
	            },
	            showInLegend: true
	        }
	    },
	    series: [{
	        name: 'Activos',
	        colorByPoint: true,
	        data: v_data
	    }]
	});
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function dashboard_membresias_x_vencer(){
	
	var tbl_membresias_x_vencer_cab= [ {
	    'sTitle' : 'COD_CLIENTE',
	    "sWidth" : "40px",
	    "sClass" : "text-center"
	},{
	    'sTitle' : 'CLIENTE',
	    "sWidth" : "150px"
	}, {
	    'sTitle' : 'DISCPLINA',
	    "sWidth" : "100px"
	},{
	    'sTitle' : 'PLAN',
	    "sWidth" : "150px"
	},{
	    'sTitle' : 'TIPO MEMBRESIA',
	    "sWidth" : "100px"
	},{
	    'sTitle' : 'FECHA INICIO',
	    "sWidth" : "50px",
	    "sClass" : "text-center"
	},{
	    'sTitle' : 'FECHA FIN',
	    "sWidth" : "50px",
	    "sClass" : "text-center"
	},{
	    'sTitle' : 'DIAS FALTAN',
	    "sWidth" : "40px",
	    "sClass" : "text-center"
	}];	

	var tbl_membresias_x_vencer_opciones = {
	responsive: false
	, lengthChange: true
	, bInfo: true
	, bFilter : true
	, bAutoWidth : true
	, aoColumnDefs : [{ "visible": false, "targets": [0,4] }]
	, bPaginate: true
	, buttons: []
	, pageLength : 5
	//, buttons: [{text:'NUEVO DISCIPLINA',action:function( e, dt, node, config ) {mantenimiento_disciplina_modal('');},className:'btn btn-info btn-sm'}]
	};
	
	ws_datos = ws('sp_dashboard_membresias_x_vencer','');
	var tbl = ws_datatable("div_graf_membresias_x_vencer", ws_datos , tbl_membresias_x_vencer_cab , tbl_membresias_x_vencer_opciones);
	
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function dashboard_deudas_x_cobrar_resumen() {

	ws_datos = ws('sp_dashboard_deudas_x_cobrar_resumen', '');
	var v_data = [];
	for ( var i = 0; i < ws_datos.length; i++) {
		var item = {
			name : ws_datos[i]['name'],
			y : parseInt(ws_datos[i]['y'])
		};
		v_data.push(item);
	}
		Highcharts.chart('div_graf_deudas_x_cobrar_resumen', {
				chart : {
					plotBackgroundColor : null,
					plotBorderWidth : null,
					plotShadow : false,
					type : 'pie'
				},
				title : {
					text : ''
				},
				tooltip : {
					pointFormat : '{series.name}: <b>{point.y}</b>'
				},
				plotOptions : {
					pie: {
						allowPointSelect : true,
						cursor : 'pointer',
						dataLabels : {
							enabled : true,
							// format: '<b>{point.name}</b>:
							// {point.percentage:.1f} %',
							format : 'S/. {point.y}',
							style : {
								color : (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
							}
						},
						showInLegend : true
					}
				},
				series : [ {
					name : 'Por Cobrar',
					colorByPoint : true,
					data : v_data
				} ]
			});
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function dashboard_ingreso_del_dia_resumen() {

	ws_datos = ws('sp_dashboard_ingreso_del_dia_resumen', '');
	var v_data = [];
	for ( var i = 0; i < ws_datos.length; i++) {
		var item = {
			name : ws_datos[i]['name'],
			y : parseInt(ws_datos[i]['y'])
		};
v_data.push(item);
}
Highcharts.chart('div_graf_ingreso_del_dia_resumen', {
						chart : {
							plotBackgroundColor : null,
							plotBorderWidth : null,
							plotShadow : false,
							type : 'pie'
						},
						title : {
							text : ''
						},
						tooltip : {
							pointFormat : '{series.name}: <b>{point.y}</b>'
						},
						plotOptions : {
							pie: {
								allowPointSelect : true,
								cursor : 'pointer',
								dataLabels : {
									enabled : true,
									// format: '<b>{point.name}</b>:
									// {point.percentage:.1f} %',
									format : 'S/. {point.y}',
									style : {
										color : (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
									}
								},
								showInLegend : true
							}
						},
						series : [ {
							name : 'Por Cobrar',
							colorByPoint : true,
							data : v_data
						} ]
					});
}