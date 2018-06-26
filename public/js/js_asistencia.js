
var tbl_cab_asistencia_tbl_alumnos_clase = [ {
												'sTitle' : 'ID',
												"sWidth" : "40px",
												"sClass" : "text-center"
											}, {
												'sTitle' : 'DESC'
											}, {
												'sTitle' : '-',
												"sWidth" : "40px",
												"sClass" : "text-center"
											} ];	
var opciones_tbl_asistencia_tbl_alumnos_clase = {
            responsive: false
            , bLengthChange: false
            , bInfo: false
            , bFilter : false
            , bAutoWidth : false
            //, bPaginate: true
            , buttons: []
            //, buttons: [{extend: 'excel', text: 'Exportar a Excel', className: 'btn btn-info btn-sm'},{extend: 'csv', text: 'Exportar a CSV', className: 'btn btn-info btn-sm'}]
        };

function charge_list_boostrap_select_datatable(){
	var id_clase = $('#hd_id_clase').val();
	var fecha = $('#hd_fecha').val();	
    var id_cb_ini = $('#cb_alumnos_reg_clase').val();
    
    //console.log(tbl_datatable); 
    var t_op = '';
    if(id_cb_ini){
		var datos = [];
		var cad_id = "";
	    for(var i = 0 ; i<id_cb_ini.length ; i++){
			var cod_cliente = id_cb_ini[i];
	        var nom_pers = $('#cb_alumnos_reg_clase option[value="'+cod_cliente+'"]').text();
	        //console.log( id_pers+ '--->' + nom_pers + '--->>' + fecha );
	        var row = [cod_cliente , nom_pers ,'<span class="fa fa-remove" onclick="asistencia_eliminar_alumno_clase(\''+cod_cliente+'\')"></span>' ];
			datos.push(row);
			cad_id += cod_cliente+',';
	    }
		
		cad_id = cad_id.substr(0,cad_id.length-1);
		//console.log([cad_id,id_clase,fecha] );
		ws_reg = ws('sp_reg_alumno_clase' , [cad_id,id_clase,fecha] );	
		//console.log(ws_reg[0].msj);
	    var tbl = ws_datatable("asistencia_tbl_alumnos_clase", datos , tbl_cab_asistencia_tbl_alumnos_clase , opciones_tbl_asistencia_tbl_alumnos_clase);
    
    }
    else{
    	ws_datatable("asistencia_tbl_alumnos_clase", [] , tbl_cab_asistencia_tbl_alumnos_clase , opciones_tbl_asistencia_tbl_alumnos_clase);
    }         
}

function asistencia_eliminar_alumno_clase(cod_cliente){
	var cod_clase = $('#hd_id_clase').val();
	var fecha = $('#hd_fecha').val();	
	ws_validar = ws('sp_del_alumno_clase' , [cod_cliente,cod_clase,fecha] );
	if(ws_validar[0].msj == 'ok'){
		asistencia_llenar_cb_tbl_alumnos_clases(cod_clase , fecha);
	}else{
		alert('Error al sacar al alumno de esta clase.');
	}
}

function asistencia_llenar_cb_tbl_alumnos_clases(cod_clase , fecha){
	ws_datos_clientes_clases = ws('sp_obt_alumno_clase' , [cod_clase,fecha] );
		if(ws_datos_clientes_clases){
			//console.log(ws_datos_clientes_clases);
			var cont_cb = [];
			var cont_tbl = [];
			for(var i = 0 ; i < ws_datos_clientes_clases.length ; i ++){

				var cod_cliente = ws_datos_clientes_clases[i].cod_cliente;
				var nom_cliente =  ws_datos_clientes_clases[i].nombre ;
				cont_cb.push(cod_cliente); 
				var row = [cod_cliente, nom_cliente ,'<span class="fa fa-remove" onclick="asistencia_eliminar_alumno_clase(\''+cod_cliente+'\')"></span>' ];
				cont_tbl.push(row);
			}
			$('#cb_alumnos_reg_clase').val(cont_cb);
			$('#cb_alumnos_reg_clase').selectpicker('render');	
			ws_datatable("asistencia_tbl_alumnos_clase", cont_tbl , tbl_cab_asistencia_tbl_alumnos_clase , opciones_tbl_asistencia_tbl_alumnos_clase);
	
		}else{
			ws_datatable("asistencia_tbl_alumnos_clase", [] , tbl_cab_asistencia_tbl_alumnos_clase , opciones_tbl_asistencia_tbl_alumnos_clase);
		}
}

function asistenca_obt_eventos_calendario(){
	ws_datos = ws('sp_calendario_clases' , ['1'] );					
	var v_eventos = [];	
	for(var i = 0 ; i < ws_datos.length ; i ++){

		var clase_alumnos =  ws_datos[i].cant_alumnos ;
		
		var ev = {
				id: ws_datos[i].cod_clase ,
				title: ws_datos[i].nom_disciplina  ,
				icon : ((clase_alumnos > 0)?'star':'') ,
				disciplina: ws_datos[i].nom_disciplina ,
	            fecha: ws_datos[i].fecha ,
	            start: ws_datos[i].fecha + 'T' + ws_datos[i].hora_ini,	
	            end: ws_datos[i].fecha + 'T' + ws_datos[i].hora_fin,
	            //url: '',
	            color: ws_datos[i].color,
	            personal: ws_datos[i].nom + ' ' + ws_datos[i].appat + ' ' + ws_datos[i].apmat ,
	            sala: ws_datos[i].nom_sala ,
	            aforo: ws_datos[i].aforo	            
		};
		v_eventos.push(ev);
	}	
	return v_eventos;
}

function asistencia_llenar_calendario(){
	
	var v_eventos = asistenca_obt_eventos_calendario();
	    
    $('#calendar').fullCalendar({
		customButtons: {
			refresh: {
			  text: 'Refrescar Eventos',
			  click: function() {
				$('#calendar').fullCalendar( 'removeEvents' );
				$('#calendar').fullCalendar( 'addEventSource', asistenca_obt_eventos_calendario() )
				$('#calendar').fullCalendar('rerenderEvents');
			  }
			}
		  },
        header: {
          left: 'prev,next today refresh',
          center: 'title',
          right: 'month,agendaWeek,agendaDay,listMonth'
        },
        eventClick: function(calEvent, jsEvent, view) {    
        	
        	ws_datatable("asistencia_tbl_alumnos_clase", [] , tbl_cab_asistencia_tbl_alumnos_clase , opciones_tbl_asistencia_tbl_alumnos_clase);
        	
			$("#hd_id_clase").val(calEvent.id);
			$("#hd_fecha").val(calEvent.fecha);
        	$("#lb_disciplina").html("Registro de Alumnos a Clases de " + calEvent.disciplina + "para el "+calEvent.fecha);
        	$("#lb_instructor").html(calEvent.personal);
        	$("#lb_sala").html(calEvent.sala);
			$("#lb_aforo").html(calEvent.aforo);
			
        	var ws_datos_clientes = ws('sp_cliente' , [''] );
        	ws_contenido_combo('cb_alumnos_reg_clase', ws_datos_clientes, '');
			
			asistencia_llenar_cb_tbl_alumnos_clases(calEvent.id , calEvent.fecha);	
			$("#modal_clientes_clase_registro").on("hidden.bs.modal", function () {
				$('#calendar').fullCalendar( 'removeEvents' );
				$('#calendar').fullCalendar( 'addEventSource', asistenca_obt_eventos_calendario() )
				$('#calendar').fullCalendar('rerenderEvents');
			});
        	$("#modal_clientes_clase_registro").modal();        
            
          },
        defaultView : 'agendaWeek',
        contentHeight: 600,
        locale: 'es',
        buttonIcons: false, // show the prev/next text
        weekNumbers: true,
        navLinks: true, // can click day/week names to navigate views
        editable: false,
        eventLimit: true, // allow "more" link when too many events
		events: v_eventos,
		eventRender: function(event, $el) {
			 if(event.icon){          
				$el.find(".fc-time").prepend("<i class='fa fa-"+event.icon+"'></i>");
			 }
			 
		  }     
      });
}

function asistencia_index(){

	
	ws_datatable("asistencia_tbl_alumnos_clase", [] , tbl_cab_asistencia_tbl_alumnos_clase , opciones_tbl_asistencia_tbl_alumnos_clase);
	$('#cb_alumnos_reg_clase').change(function(event){ charge_list_boostrap_select_datatable(); });
	asistencia_llenar_calendario();
}