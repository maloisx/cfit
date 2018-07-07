/* **************************************************************************************************************************************************************** */
/* **************************************************************************************************************************************************************** */
/*
 * MANTENIMIENTO DISCIPLINA 
 */

var tbl_listardisciplinas_cab= [ {
    'sTitle' : 'CODIGO',
    "sWidth" : "40px",
    "sClass" : "text-center"
},{
    'sTitle' : 'NOMBRE',
    "sWidth" : "150px"
}, {
    'sTitle' : 'DESCRIPCION'
},{
    'sTitle' : 'COLOR',
    "sWidth" : "50px",
    "sClass" : "text-center"
},{
    'sTitle' : '-',
    "sWidth" : "40px",
    "sClass" : "text-center"
}];	

var tbl_listardisciplinas_opciones = {
responsive: false
, bLengthChange: false
, bInfo: false
, bFilter : true
, bAutoWidth : true
, aoColumnDefs : [{ "visible": false, "targets": [0] },{ "orderable":false, "targets": [1]}]
//, bPaginate: true
//, buttons: []
, buttons: [{text:'NUEVO DISCIPLINA',action:function( e, dt, node, config ) {mantenimiento_disciplina_modal('');},className:'btn btn-info btn-sm'}]
};

function mantenimiento_disciplinas_tbl_listar(){
	
	ws_disciplina = ws('sp_disciplinas' , [''] );

    for(var i= 0 ; i<ws_disciplina.length ; i++){
        var cod_disciplina = ws_disciplina[i].cod_disciplina;
        var len = Object.keys(ws_disciplina[i]).length / 2 ;
        ws_disciplina[i][len] = tbl_ext_btn('edit',"mantenimiento_disciplina_modal('"+cod_disciplina+"')") ;        
        ws_disciplina[i][3] = ws_disciplina[i]['color'] = '<div class="form-group"><input readonly class="form-control" type="color" value="'+ws_disciplina[i].color+'" id="example-color-input"></div>';
    }

    console.log(ws_disciplina);
    var tbl = ws_datatable("div_tbl_disciplinas", ws_disciplina , tbl_listardisciplinas_cab , tbl_listardisciplinas_opciones);
}

function mantenimiento_disciplinas(){
	mantenimiento_disciplinas_tbl_listar();
}

function mantenimiento_disciplina_modal(cod_disciplina){	
	
	$('.lbl_active').addClass('active');
	if(cod_disciplina != ''){
		ws_disciplina = ws('sp_disciplinas' , [cod_disciplina] );		
		$('#hd_modal_disciplina_codigo').val(cod_disciplina);
		$('#txt_modal_disciplina_nombre').val(ws_disciplina[0]['nom_disciplina']);
		$('#txt_modal_disciplina_descripcion').val(ws_disciplina[0]['des_disciplina']);
		$('#txt_modal_disciplina_color').val(ws_disciplina[0]['color']);
	}else{
		$('#hd_modal_disciplina_codigo').val('');
		$('#txt_modal_disciplina_nombre').val('');
		$('#txt_modal_disciplina_descripcion').val('');
		$('#txt_modal_disciplina_color').val('');
	}	
	$('#modal_mantenimiento_disciplina').modal();
	
}

function mantenimiento_disciplina_modal_guardar(){		
	
	var cod_disciplina = $('#hd_modal_disciplina_codigo').val();
	var nom_disciplina = $('#txt_modal_disciplina_nombre').val();
	var des_disciplina = $('#txt_modal_disciplina_descripcion').val();
	var color = $('#txt_modal_disciplina_color').val();
	
	var array_params = [cod_disciplina,nom_disciplina,des_disciplina,color];
	console.log(array_params);
	ws_rpta = ws('sp_reg_disciplina' , array_params );
	console.log(ws_rpta);	
	
	if(ws_rpta[0].msj = 'ok'){
		$('#hd_modal_disciplina_codigo').val(ws_rpta[0].cod_disciplina);
		toastr.success("Disciplina Guardado con exito");	
		mantenimiento_disciplinas_tbl_listar();
    }else{
		toastr.error("Error en el guardado de Disciplina.");		
	}
		
	//$('#modal_mantenimiento_disciplina').modal('hide');
	
}

/* **************************************************************************************************************************************************************** */
/* **************************************************************************************************************************************************************** */
/* **************************************************************************************************************************************************************** */
/* **************************************************************************************************************************************************************** */
/*
 * MANTENIMIENTO SEDES
 */

var tbl_listar_sedes_cab= [ {
    'sTitle' : 'CODIGO',
    "sWidth" : "40px",
    "sClass" : "text-center"
},{
    'sTitle' : 'NOMBRE',
    "sWidth" : "150px"
}, {
    'sTitle' : 'DIRECCION'
},{
    'sTitle' : 'ESTADO',
    "sWidth" : "40px",
    "sClass" : "text-center"
},{
    'sTitle' : '-',
    "sWidth" : "40px",
    "sClass" : "text-center"
}];	

var tbl_listar_sedes_opciones = {
responsive: false
, bLengthChange: false
, bInfo: false
, bFilter : true
, bAutoWidth : true
, aoColumnDefs : [{ "visible": false, "targets": [0] }]
//, bPaginate: true
//, buttons: []
, buttons: [{text:'NUEVA SEDE',action:function( e, dt, node, config ) {mantenimiento_sede_modal('');},className:'btn btn-info btn-sm'}]
};

function mantenimiento_sedes_tbl_listar(){
	
	ws_sedes= ws('sp_sedes' , [''] );

    for(var i= 0 ; i<ws_sedes.length ; i++){
        var cod = ws_sedes[i].cod_sede;
        var len = Object.keys(ws_sedes[i]).length / 2 ;
        ws_sedes[i][len] = tbl_ext_btn('edit',"mantenimiento_sede_modal('"+cod+"')") ;    
        /*boton de estado*/        	
        ws_sedes[i][3] = ws_sedes[i]['estado'] = ((ws_sedes[i]['estado'] == 1)?tbl_ext_btn('check',''):tbl_ext_btn('close','','red'));
    }

    console.log(ws_sedes);
    var tbl = ws_datatable("div_tbl_sedes", ws_sedes , tbl_listar_sedes_cab , tbl_listar_sedes_opciones);
}

function mantenimiento_sedes(){
	mantenimiento_sedes_tbl_listar();
}

function mantenimiento_sede_modal(cod){	
	
	$('.lbl_active').addClass('active');
	if(cod != ''){
		ws_datos = ws('sp_sedes' , [cod] );		
		$('#hd_modal_sede_codigo').val(cod);
		$('#txt_modal_sede_nombre').val(ws_datos[0]['nom_sede']);
		$('#txt_modal_sede_direccion').val(ws_datos[0]['direccion']);
		$('#cb_modal_sede_estado').selectpicker('val',ws_datos[0]['estado']);
	}else{
		$('#hd_modal_sede_codigo').val('');
		$('#txt_modal_sede_nombre').val('');
		$('#txt_modal_sede_direccion').val('');
		$('#cb_sede_estado').selectpicker('val','');
	}	
	$('#modal_mantenimiento_sede').modal();
	
}

function mantenimiento_sede_modal_guardar(){		
	
	var cod_sede = $('#hd_modal_sede_codigo').val();
	var nom_sede = $('#txt_modal_sede_nombre').val();
	var dir_sede = $('#txt_modal_sede_direccion').val();
	var estado_sede = $('#cb_modal_sede_estado').val();
	
	var array_params = [cod_sede,nom_sede,dir_sede,estado_sede];
	console.log(array_params);
	ws_rpta = ws('sp_reg_sede' , array_params );
	console.log(ws_rpta);	
	
	if(ws_rpta[0].msj = 'ok'){
		$('#hd_modal_sede_codigo').val(ws_rpta[0].cod_sede);
		toastr.success("Sede Guardada con exito");	
		mantenimiento_sedes_tbl_listar();
    }else{
		toastr.error("Error en el guardado de Sede.");		
	}
		
	//$('#modal_mantenimiento_sede').modal('hide');
	
}

/* **************************************************************************************************************************************************************** */
/* **************************************************************************************************************************************************************** */
/* **************************************************************************************************************************************************************** */
/* **************************************************************************************************************************************************************** */
/*
 * MANTENIMIENTO SALAS
 */

var tbl_listar_sala_cab= [ {
    'sTitle' : 'CODIGO',
    "sWidth" : "40px",
    "sClass" : "text-center"
},{
    'sTitle' : 'NOMBRE SALA'
}, {
    'sTitle' : 'CODSEDE'
},{
    'sTitle' : 'SEDE'
},{
    'sTitle' : 'ESTADO',
    "sWidth" : "40px",
    "sClass" : "text-center"
},{
    'sTitle' : '-',
    "sWidth" : "40px",
    "sClass" : "text-center"
}];	

var tbl_listar_sala_opciones = {
responsive: false
, bLengthChange: false
, bInfo: false
, bFilter : true
, bAutoWidth : true
, aoColumnDefs : [{ "visible": false, "targets": [0,2] }]
//, bPaginate: true
//, buttons: []
, buttons: [{text:'NUEVA SALA',action:function( e, dt, node, config ) {mantenimiento_sala_modal('');},className:'btn btn-info btn-sm'}]
};

function mantenimiento_salas_tbl_listar(){
	
	ws_salas= ws('sp_salas' , ['',''] );

    for(var i= 0 ; i<ws_salas.length ; i++){
        var cod = ws_salas[i].cod_sala;
        var len = Object.keys(ws_salas[i]).length / 2 ;
        ws_salas[i][len] = tbl_ext_btn('edit',"mantenimiento_sala_modal('"+cod+"')") ;    
        /*boton de estado*/        	
        ws_salas[i][4] = ws_salas[i]['estado'] = ((ws_salas[i]['estado'] == 1)?tbl_ext_btn('check',''):tbl_ext_btn('close','','red'));
    }

    console.log(ws_salas);
    var tbl = ws_datatable("div_tbl_salas", ws_salas , tbl_listar_sala_cab , tbl_listar_sala_opciones);
}

function mantenimiento_salas(){
	mantenimiento_salas_tbl_listar();
}

function mantenimiento_sala_modal(cod){	
		
	ws_sedes= ws('sp_sedes' , [''] );
	
	
	$('.lbl_active').addClass('active');
	if(cod != ''){
		ws_datos = ws('sp_salas' , [cod,''] );		
		$('#hd_modal_sala_codigo').val(cod);
		$('#txt_modal_sala_nombre').val(ws_datos[0]['nom_sala']);		
		ws_contenido_combo('cb_modal_sala_sede',ws_sedes,ws_datos[0]['cod_sede']);
		$('#cb_modal_sala_estado').selectpicker('val',ws_datos[0]['estado']);
	}else{
		$('#hd_modal_sala_codigo').val('');
		$('#txt_modal_sala_nombre').val('');
		ws_contenido_combo('cb_modal_sala_sede',ws_sedes,'');
		$('#cb_modal_sala_estado').selectpicker('val','');
	}	
	$('#modal_mantenimiento_sala').modal();
	
}

function mantenimiento_sala_modal_guardar(){		
	
	var cod_sala = $('#hd_modal_sala_codigo').val();
	var nom_sala = $('#txt_modal_sala_nombre').val();
	var cod_sede = $('#cb_modal_sala_sede').val();
	var estado_sala = $('#cb_modal_sala_estado').val();
	
	var array_params = [cod_sala,nom_sala,cod_sede,estado_sala];
	console.log(array_params);
	ws_rpta = ws('sp_reg_sala' , array_params );
	console.log(ws_rpta);	
	
	if(ws_rpta[0].msj = 'ok'){
		$('#hd_modal_sala_codigo').val(ws_rpta[0].cod_sala);
		toastr.success("Sala Guardada con exito");	
		mantenimiento_salas_tbl_listar();
    }else{
		toastr.error("Error en el guardado de Sala.");		
	}
		
	//$('#modal_mantenimiento_sede').modal('hide');
}
/* **************************************************************************************************************************************************************** */
/* **************************************************************************************************************************************************************** */
/* **************************************************************************************************************************************************************** */
/* **************************************************************************************************************************************************************** */
/*
 * MANTENIMIENTO CLASES
 */

var tbl_listar_clase_cab= [ {
    'sTitle' : 'CODIGO',
    "sWidth" : "40px",
    "sClass" : "text-center"
},{
    'sTitle' : 'COD DISCIPLINA'
}, {
    'sTitle' : 'DISCIPLINA'
},{
    'sTitle' : 'COD PERSONAL'
},{
    'sTitle' : 'PERSONAL'
},{
    'sTitle' : 'COD SEDE'
},{
    'sTitle' : 'SEDE'
},{
    'sTitle' : 'COD SALA'
},{
    'sTitle' : 'SALA'
},{
    'sTitle' : 'AFORO',
    "sClass" : "text-center"
},{
    'sTitle' : 'HORA INI',
    "sClass" : "text-center"
},{
    'sTitle' : 'HORA FIN',
    "sClass" : "text-center"
},{
    'sTitle' : 'REPETIR'
},{
    'sTitle' : 'FECHA INI',
    "sWidth" : "80px",
    "sClass" : "text-center"
},{
    'sTitle' : 'FECHA FIN',
    "sWidth" : "80px",
    "sClass" : "text-center"
},{
    'sTitle' : 'COD DIAS'
},{
    'sTitle' : 'DIAS'    
},{
    'sTitle' : 'ESTADO',
    "sWidth" : "40px",
    "sClass" : "text-center"
},{
    'sTitle' : '-',
    "sWidth" : "40px",
    "sClass" : "text-center"
}];	

var tbl_listar_clase_opciones = {
responsive: false
, bLengthChange: false
, bInfo: false
, bFilter : true
, bSort : false
, bAutoWidth : true
, aoColumnDefs : [{ "visible": false, "targets": [0,1,3,5,7,12,15] }]
//, bPaginate: true
//, buttons: []
, buttons: [{text:'NUEVA CLASE',action:function( e, dt, node, config ) {mantenimiento_clase_modal('');},className:'btn btn-info btn-sm'}]
};

function mantenimiento_clases_tbl_listar(){
	
	ws_clases= ws('sp_clases' , [''] );

    for(var i= 0 ; i<ws_clases.length ; i++){
        var cod = ws_clases[i].cod_clase;
        var len = Object.keys(ws_clases[i]).length / 2 ;
        ws_clases[i][len] = tbl_ext_btn('edit',"mantenimiento_clase_modal('"+cod+"')") ;    
        /*boton de estado*/        	
        ws_clases[i][17] = ws_clases[i]['estado'] = ((ws_clases[i]['estado'] == 1)?tbl_ext_btn('check',''):tbl_ext_btn('close','','red'));
    }

    console.log(ws_clases);
    var tbl = ws_datatable("div_tbl_clases", ws_clases , tbl_listar_clase_cab , tbl_listar_clase_opciones);
}

var mantenimiento_clases_cod_entrenador = '';
var mantenimiento_clases_cod_sala = '';

function mantenimiento_clases(){
	
	mantenimiento_clases_tbl_listar();
	
	$("#cb_modal_clase_disciplina").change(function(){
		var cod_disciplina = $(this).val();
		var ws_disciplina_entrenadores = ws('sp_disciplina_entrenadores' , [cod_disciplina] );
		if(ws_disciplina_entrenadores)
			ws_contenido_combo('cb_modal_clase_entrenador',ws_disciplina_entrenadores,mantenimiento_clases_cod_entrenador);
		else
			ws_contenido_combo('cb_modal_clase_entrenador',[],'');
	});
	
	$("#cb_modal_clase_sede").change(function(){
		var cod_sede = $(this).val();
		var ws_sede_salas = ws('sp_salas' , ['',cod_sede] );
		if(ws_sede_salas)
			ws_contenido_combo('cb_modal_clase_sala',ws_sede_salas,mantenimiento_clases_cod_sala);
		else
			ws_contenido_combo('cb_modal_clase_sala',[],'');
	});
	
	$("#chb_modal_clase_repetir").change(function(){
		var checked = $(this).prop('checked');		
		if(checked)
			$('#div_cb_modal_clase_dias').show();
		else
			$('#div_cb_modal_clase_dias').hide();
	});
	
}

function mantenimiento_clase_modal(cod){	
	
	ws_disciplinas= ws('sp_disciplinas' , [''] );
	ws_sedes= ws('sp_sedes' , [''] );
	ws_dias= ws('sp_dias' , '' );	
	
	$('.lbl_active').addClass('active');
	
	if(cod != ''){
		ws_datos = ws('sp_clases' , [cod] );
		console.log(ws_datos);
		$('#hd_modal_clase_codigo').val(cod);
		
		mantenimiento_clases_cod_entrenador = ws_datos[0]['cod_personal'];
		mantenimiento_clases_cod_sala = ws_datos[0]['cod_sala'];
		
		ws_contenido_combo('cb_modal_clase_disciplina',ws_disciplinas,ws_datos[0]['cod_disciplina']);
		$( "#cb_modal_clase_disciplina").trigger("change");
		ws_contenido_combo('cb_modal_clase_sede',ws_sedes,ws_datos[0]['cod_sede']);
		$( "#cb_modal_clase_sede").trigger("change");
		ws_contenido_combo('cb_modal_clase_dias',ws_dias, ((ws_datos[0]['cod_dias'])?ws_datos[0]['cod_dias'].split(','):'') );
		
		$('#txt_modal_clase_aforo').val(ws_datos[0]['aforo']);
		$('#txt_modal_clase_fecha').val(ws_datos[0]['fecha']);	
		$('#txt_modal_clase_fecha_fin').val(ws_datos[0]['fecha_fin']);
		$('#txt_modal_clase_hora_ini').val(ws_datos[0]['hora_ini']);	
		$('#txt_modal_clase_hora_fin').val(ws_datos[0]['hora_fin']);	
		
		var repetir = ws_datos[0]['repetir'];
		if(repetir == 1){
			$('#chb_modal_clase_repetir').prop('checked', true);
			$('#div_cb_modal_clase_dias').show();
		}else{
			$('#chb_modal_clase_repetir').prop('checked', false);
			$('#div_cb_modal_clase_dias').hide();
		}
		
//		ws_contenido_combo('cb_modal_sala_sede',ws_sedes,ws_datos[0]['cod_sede']);
//		$('#cb_modal_sala_estado').selectpicker('val',ws_datos[0]['estado']);
	}else{
		$('#hd_modal_clase_codigo').val('');
//		$('#txt_modal_sala_nombre').val('');
//		$('#cb_modal_sala_estado').selectpicker('val','');
		mantenimiento_clases_cod_entrenador = '';
		mantenimiento_clases_cod_sala = '';
		ws_contenido_combo('cb_modal_clase_disciplina',ws_disciplinas,'');
		ws_contenido_combo('cb_modal_clase_sede',ws_sedes,'');
		ws_contenido_combo('cb_modal_clase_dias',ws_dias,'');
		$('#txt_modal_clase_aforo').val('');
		$('#txt_modal_clase_fecha').val('');	
		$('#txt_modal_clase_fecha_fin').val('');
		$('#txt_modal_clase_hora_ini').val('');	
		$('#txt_modal_clase_hora_fin').val('');
		$('#chb_modal_clase_repetir').prop('checked', false);
		$('#div_cb_modal_clase_dias').hide();
	}	
	$('#modal_mantenimiento_clase').modal();	
	
}

function mantenimiento_clase_modal_guardar(){		

	var cod_clase = $('#hd_modal_clase_codigo').val();
	var cod_disciplina = $('#cb_modal_clase_disciplina').val();
	var cod_entrenador = $('#cb_modal_clase_entrenador').val();
	var cod_sala = $('#cb_modal_clase_sala').val();
	var aforo = $('#txt_modal_clase_aforo').val();
	var fecha_ini = $('#txt_modal_clase_fecha').val();
	var fecha_fin = $('#txt_modal_clase_fecha_fin').val();
	var hora_fin = $('#txt_modal_clase_hora_ini').val();
	var hora_ini = $('#txt_modal_clase_hora_fin').val();
	var repetir = ($('#chb_modal_clase_repetir').prop('checked'))?'1':'0';	
	var dias = $('#cb_modal_clase_dias').val().join(',');
	var estado = $('#cb_modal_clase_estado').val();
	
	if(repetir == '0'){
		fecha_fin = fecha_ini;
		dias = '';
	}
		
	var array_params = [cod_clase,cod_disciplina,cod_entrenador,cod_sala,aforo,fecha_ini,fecha_fin,hora_fin,hora_ini,repetir,dias,estado];
	console.log(array_params);
	ws_rpta = ws('sp_reg_clase' , array_params );
	console.log(ws_rpta);		
	if(ws_rpta[0].msj = 'ok'){
		$('#hd_modal_clase_codigo').val(ws_rpta[0].cod_clase);
		toastr.success("Clase Guardada con exito");	
		mantenimiento_clases_tbl_listar();
    }else{
		toastr.error("Error en el guardado de Clase.");		
	}
		
	//$('#modal_mantenimiento_sede').modal('hide');
}

/* **************************************************************************************************************************************************************** */
/* **************************************************************************************************************************************************************** */
/* **************************************************************************************************************************************************************** */
/* **************************************************************************************************************************************************************** */
/*
 * MANTENIMIENTO PERSONAL
 */


var tbl_listar_personal_cab= [ {
    'sTitle' : 'CODIGO',
    "sWidth" : "40px",
    "sClass" : "text-center"
},{
    'sTitle' : 'NOMBRE'
}, {
    'sTitle' : 'NOM'
},{
    'sTitle' : 'APPPAT'
},{
    'sTitle' : 'APPMAT'
},{
    'sTitle' : 'DNI'
},{
    'sTitle' : 'FECHA_NAC'
},{
    'sTitle' : 'SEXO'
},{
    'sTitle' : 'TELEFONO'
},{
    'sTitle' : 'CELULAR'
},{
    'sTitle' : 'EMAIL'
},{
    'sTitle' : 'CODDIST'
},{
    'sTitle' : 'DIRECCION'
},{
    'sTitle' : 'COD ROL'
},{
    'sTitle' : 'ROL'
},{
    'sTitle' : 'USUARIO'
},{
    'sTitle' : 'COD DISCIPLINAS'
},{
    'sTitle' : 'DISCIPLINAS' ,
    "sWidth" : "100px"
},{
    'sTitle' : 'ESTADO',
    "sWidth" : "40px",
    "sClass" : "text-center"
}
,{
    'sTitle' : '-',
    "sWidth" : "40px",
    "sClass" : "text-center"
} 
];	

var tbl_listar_personal_opciones = {
responsive: false
, bLengthChange: false
, bInfo: false
, bFilter : true
, bAutoWidth : false
, bSort : false
, aoColumnDefs : [{ "visible": false, "targets": [0,2,3,4,5,6,7,8,9,10,11,12,13,15,16] }]
, bPaginate: false
//, buttons: []
, buttons: [{extend: 'excel', text: 'Exportar a Excel', className: 'btn btn-info btn-sm'},{text:'NUEVO PERSONAL',action:function( e, dt, node, config ) {mantenimiento_personal_modal('');},className:'btn btn-info btn-sm'}]
};

function mantenimiento_personal_tbl_listar(){
	
	ws_datos= ws('sp_personal' , [''] );

    for(var i= 0 ; i<ws_datos.length ; i++){
        var cod = ws_datos[i].cod_personal;
        var len = Object.keys(ws_datos[i]).length / 2 ;
        ws_datos[i][len] = tbl_ext_btn('edit',"mantenimiento_personal_modal('"+cod+"')") ;    
        /*boton de estado*/        	
        ws_datos[i][18] = ws_datos[i]['estado'] = ((ws_datos[i]['estado'] == 1)?tbl_ext_btn('check',''):tbl_ext_btn('close','','red'));
    }

    console.log(ws_datos);
    var tbl = ws_datatable("div_tbl_personal", ws_datos , tbl_listar_personal_cab , tbl_listar_personal_opciones);
}

function mantenimiento_personal(){
	
	mantenimiento_personal_tbl_listar();
}
function mantenimiento_personal_modal(cod){
	
	var ws_rol = ws('sp_rol',['']);
	var ws_disciplinas = ws('sp_disciplinas',['']);
	
	if(cod != ''){		
		ws_datos = ws('sp_personal' , [cod] );
		$('.lbl_active').addClass('active');
    	console.log(ws_datos)    ;	
    	$('#hd_modal_personal_codigo').val(ws_datos[0].cod_personal);	   
	    $('#txt_dni').val(ws_datos[0].dni);
	    $('#txt_nombre').val(ws_datos[0].nom);
	    $('#txt_appat').val(ws_datos[0].appat);
	    $('#txt_apmat').val(ws_datos[0].apmat);
	    $('#txt_fec_nac').val(ws_datos[0].fecha_nac);
	    $('#cb_sexo').selectpicker('val',ws_datos[0].sexo);
	    
	    $('#txt_telefono').val(ws_datos[0].telefono);
	    $('#txt_celular').val(ws_datos[0].celular);
	    $('#txt_email').val(ws_datos[0].email);
	    $('#txt_direccion').val(ws_datos[0].direccion);
	    ws_contenido_combo('cb_rol',ws_rol,ws_datos[0].cod_rol);
	    ws_contenido_combo('cb_disciplinas',ws_disciplinas,((ws_datos[0].cod_disciplina)?ws_datos[0].cod_disciplina.split(','):''));
	    $('#txt_user').val(ws_datos[0].usuario);
	    $('#txt_pass').val('');
	    $('#cb_modal_personal_estado').selectpicker('val',ws_datos[0]['estado']);
	}else{
		$('#hd_modal_personal_codigo').val('');
		$('#txt_dni').val('');
	    $('#txt_nombre').val('');
	    $('#txt_appat').val('');
	    $('#txt_apmat').val('');
	    $('#txt_fec_nac').val('');
	    $('#cb_sexo').selectpicker('val','');
	    
	    $('#txt_telefono').val('');
	    $('#txt_celular').val('');
	    $('#txt_email').val('');
	    $('#txt_direccion').val('');
	    ws_contenido_combo('cb_rol',ws_rol,'');
	    ws_contenido_combo('cb_disciplinas',ws_disciplinas,'');
	    $('#txt_user').val('');
	    $('#txt_pass').val('');
	    $('#cb_modal_personal_estado').selectpicker('val','');
	 }
	
	$("#modal_mantenimiento_personal").modal();    
}

function mantenimiento_personal_modal_guardar(){
	
	cod = $('#hd_modal_personal_codigo').val();
	dni = $('#txt_dni').val();
	nom = $('#txt_nombre').val();
	appat = $('#txt_appat').val();
	apmat = $('#txt_apmat').val();
	fecha_nac = $('#txt_fec_nac').val();
	sexo = $('#cb_sexo').val();
	telefono = $('#txt_telefono').val();
	celular = $('#txt_celular').val();
	email = $('#txt_email').val();
	direccion = $('#txt_direccion').val();
	cod_rol = $('#cb_rol').val();
	cod_disciplinas = $('#cb_disciplinas').val().join(',');
	user = $('#txt_user').val();
	pass = $('#txt_pass').val();
	estado = $('#cb_modal_personal_estado').val();
	
	console.log( [cod,nom,appat,apmat,dni,fecha_nac,sexo,telefono,celular,email,direccion,cod_rol,cod_disciplinas,user,pass,estado]);
	
	var data = ws('sp_reg_personal' , [cod,nom,appat,apmat,dni,fecha_nac,sexo,telefono,celular,email,direccion,cod_rol,cod_disciplinas,user,pass,estado] );
	
	if( data[0].msj == 'ok'){
		$('#hd_modal_personal_codigo').val(data[0].cod_personal);
		//$('#lb_title').html(nom.toUpperCase() + ' ' + appat.toUpperCase() + ' ' + apmat.toUpperCase());
		toastr.success("Perfil Guardado con exito");
		//$('#li_pagos').removeClass('disabled');
		mantenimiento_personal_tbl_listar();
    }else{
		toastr.error("Error en el guardado de perfil.");
	}
}

/* **************************************************************************************************************************************************************** */
/* **************************************************************************************************************************************************************** */
/* **************************************************************************************************************************************************************** */
/* **************************************************************************************************************************************************************** */
/*
 * MANTENIMIENTO PLANES
 */


var tbl_listar_planes_cab= [ {
    'sTitle' : 'CODIGO',
    "sWidth" : "40px",
    "sClass" : "text-center"
},{
    'sTitle' : 'PLAN'
}, {
    'sTitle' : 'COD DISCIPLINA'
},{
    'sTitle' : 'DISCIPLINA PRINCIPAL'
},{
    'sTitle' : 'NRO. SESIONES'
},{
    'sTitle' : 'DURAC. MESES'
},{
    'sTitle' : 'DURAC. DIAS'
},{
    'sTitle' : 'CONGELAMIENTO'
},{
    'sTitle' : 'PRECIO'
},{
    'sTitle' : 'COD TIPO VENTA'
},{
    'sTitle' : 'TIPO VENTA'
},{
    'sTitle' : 'COD DISCIPLINAS'
},{
    'sTitle' : 'DISCIPLINAS EXTRAS' ,
    "sWidth" : "100px"
},{
    'sTitle' : 'ESTADO',
    "sWidth" : "40px",
    "sClass" : "text-center"
}
,{
    'sTitle' : '-',
    "sWidth" : "40px",
    "sClass" : "text-center"
} 
];	

var tbl_listar_planes_opciones = {
responsive: false
, bLengthChange: false
, bInfo: false
, bFilter : true
, bAutoWidth : false
//, bSort : false
, aoColumnDefs : [{ "visible": false, "targets": [0,2,4,9,11] }]
, bPaginate: false
//, buttons: []
, buttons: [{text:'NUEVO PLAN',action:function( e, dt, node, config ) {mantenimiento_plan_modal('');},className:'btn btn-info btn-sm'}]
};

function mantenimiento_plan_tbl_listar(){
	
	ws_datos= ws('sp_planes' , [''] );

    for(var i= 0 ; i<ws_datos.length ; i++){
        var cod = ws_datos[i].cod_plan;
        var len = Object.keys(ws_datos[i]).length / 2 ;
        ws_datos[i][len] = tbl_ext_btn('edit',"mantenimiento_plan_modal('"+cod+"')") ;    
        /*boton de estado*/        	
        ws_datos[i][13] = ws_datos[i]['estado'] = ((ws_datos[i]['estado'] == 1)?tbl_ext_btn('check',''):tbl_ext_btn('close','','red'));
    }

    console.log(ws_datos);
    var tbl = ws_datatable("div_tbl_planes", ws_datos , tbl_listar_planes_cab , tbl_listar_planes_opciones);
}

function mantenimiento_planes(){
	
	mantenimiento_plan_tbl_listar();
}


function mantenimiento_plan_modal(cod){
	
	var ws_tipo_venta = ws('sp_tipo_venta',['']);
	var ws_disciplinas = ws('sp_disciplinas',['']);
	$('.lbl_active').addClass('active');
	if(cod != ''){		
		ws_datos= ws('sp_planes' , [cod] );		
    	console.log(ws_datos)    ;	
    	$('#hd_modal_plan_codigo').val(ws_datos[0].cod_plan);	   
	    $('#txt_modal_plan_nombre').val(ws_datos[0].nom_plan);
	    ws_contenido_combo('cb_modal_plan_disciplina',ws_disciplinas , ws_datos[0].cod_disciplina);
	    ws_contenido_combo('cb_modal_plan_disciplinas_extras',ws_disciplinas , (ws_datos[0].cod_disciplinas_extras)?ws_datos[0].cod_disciplinas_extras.split(','):'' );
	    $('#txt_modal_plan_nro_sesiones').val(ws_datos[0].nro_sesiones);
	    $('#txt_modal_plan_dia_freeze').val(ws_datos[0].nro_dias_freezee);
	    $('#txt_modal_plan_duracion_meses').val(ws_datos[0].duracion_meses);
	    $('#txt_modal_plan_duracion_dias').val(ws_datos[0].duracion_dias);
	    $('#txt_modal_plan_precio').val(ws_datos[0].precio);
	    ws_contenido_combo('cb_modal_plan_tipo_venta',ws_tipo_venta , ws_datos[0].cod_tipo_venta);
	    
	    $('#cb_modal_plan_estado').selectpicker('val',ws_datos[0]['estado']);	    
	    
	}else{
		$('#hd_modal_plan_codigo').val('');	   
	    $('#txt_modal_plan_nombre').val('');
	    ws_contenido_combo('cb_modal_plan_disciplina',ws_disciplinas , '');
	    ws_contenido_combo('cb_modal_plan_disciplinas_extras',ws_disciplinas ,'');
	    $('#txt_modal_plan_nro_sesiones').val('0');
	    $('#txt_modal_plan_dia_freeze').val('0');
	    $('#txt_modal_plan_duracion_meses').val('0');
	    $('#txt_modal_plan_duracion_dias').val('0');
	    $('#txt_modal_plan_precio').val('0');
	    ws_contenido_combo('cb_modal_plan_tipo_venta',ws_tipo_venta , '1');
	    
	    $('#cb_modal_plan_estado').selectpicker('val','1');
	 }
	
	$("#modal_mantenimiento_plan").modal();    
}

function mantenimiento_plan_modal_guardar(){
	
	cod = $('#hd_modal_plan_codigo').val();
	nom_plan = $('#txt_modal_plan_nombre').val();
	cod_disciplina_princ   = $('#cb_modal_plan_disciplina').val();	
	sesiones  = $('#txt_modal_plan_nro_sesiones').val();
	meses = $('#txt_modal_plan_duracion_meses').val();
	dias = $('#txt_modal_plan_duracion_dias').val();
	freeze = $('#txt_modal_plan_dia_freeze').val();	
	precio = $('#txt_modal_plan_precio').val();
	cod_tipo_venta = $('#cb_modal_plan_tipo_venta').val();
	
	cod_disciplina_extras  = $('#cb_modal_plan_disciplinas_extras').val().join(',');
	
	estado = $('#cb_modal_plan_estado').val();
		
	var array_param =  [cod,nom_plan,cod_disciplina_princ,sesiones,meses,dias,freeze,precio,cod_tipo_venta,estado,cod_disciplina_extras] ;
	console.log(array_param);
	
	var data = ws('sp_reg_plan' , array_param );
	
	if( data[0].msj == 'ok'){
		$('#hd_modal_plan_codigo').val(data[0].cod_plan);
		//$('#lb_title').html(nom.toUpperCase() + ' ' + appat.toUpperCase() + ' ' + apmat.toUpperCase());
		toastr.success("Plan Guardado con exito");
		//$('#li_pagos').removeClass('disabled');
		mantenimiento_plan_tbl_listar();
    }else{
		toastr.error("Error en el guardado de Plan.");
	}
}
