
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
    'sTitle' : 'COD_DOCIDENT'
},{
    'sTitle' : 'DOC IDENT'
},{
    'sTitle' : 'NRO DOC IDENT'
},{
    'sTitle' : 'SEXO'
},{
    'sTitle' : 'TELEFONO'
},{
    'sTitle' : 'DIRECCION'
},{
    'sTitle' : 'COD ROL'
},{
    'sTitle' : 'ROL'
},{
    'sTitle' : 'USUARIO'
},{
    'sTitle' : 'SOCIO REF.'
},
{
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
, aoColumnDefs : [{ "visible": false, "targets": [0,2,3,4,5,8,10,11,13] }]
, bPaginate: false
//, buttons: []
, buttons: [{extend: 'excel', text: 'Exportar a Excel', className: 'btn btn-info btn-sm'},{text:'NUEVA PERSONA',action:function( e, dt, node, config ) {mantenimiento_persona_modal('');},className:'btn btn-info btn-sm'}]
};

function mantenimiento_persona_tbl_listar(){
	
	ws_datos= ws('sp_persona' , [''] );

    for(var i= 0 ; i<ws_datos.length ; i++){
        var cod = ws_datos[i].cod_persona;
        var len = Object.keys(ws_datos[i]).length / 2 ;
        ws_datos[i][len] = tbl_ext_btn('edit',"mantenimiento_persona_modal('"+cod+"')") ;    
        /*boton de estado*/        	
        ws_datos[i][15] = ws_datos[i]['estado'] = ((ws_datos[i]['estado'] == 1)?tbl_ext_btn('check',''):tbl_ext_btn('close','','red'));
    }

    console.log(ws_datos);
    var tbl = ws_datatable("div_tbl_persona", ws_datos , tbl_listar_personal_cab , tbl_listar_personal_opciones);
}

function mantenimiento_persona(){
	mantenimiento_persona_tbl_listar();
}

function mantenimiento_persona_modal(cod){
	
	var ws_rol = ws('sp_rol',['']);
	//var ws_disciplinas = ws('sp_disciplinas',['']);
	/*
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
	}*/
	
	$("#modal_mantenimiento_persona").modal();    
}