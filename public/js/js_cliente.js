

var tbl_cab_cliente= [ {
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
    'sTitle' : 'CONTACTO_EMERG'
},{
    'sTitle' : 'TELEFONO_EMERG'
}
,{
    'sTitle' : '-',
    "sWidth" : "40px",
    "sClass" : "text-center"
} 
];	

var opciones_tbl_cliente = {
responsive: false
, bLengthChange: false
, bInfo: false
, bFilter : true
, bAutoWidth : true
, columnDefs : [{ "visible": false, "targets": [0,2,3,4,7,8,9,10,11,12,13,14] }]
, bPaginate: true
//, buttons: []
, buttons: [{extend: 'excel', text: 'Exportar a Excel', className: 'btn btn-info btn-sm'},{text:'NUEVO CLIENTE',action:function( e, dt, node, config ) {cliente_mantenimiento_modal('')},className:'btn btn-info btn-sm'}]
};


var tbl_cab_membresia_abonos = [ {
    'sTitle' : 'MONTO',
    "sWidth" : "23%"
},{
    'sTitle' : 'TIP. PAGO',
    "sWidth" : "23%"
}, {
    'sTitle' : 'TIP. COMPRO.',
    "sWidth" : "23%"
},{
    'sTitle' : 'NRO COMPRO.',
    "sWidth" : "23%"
},{
    'sTitle' : '-',
    "sWidth" : "8%",
    "sClass" : "text-center"
} 
];

var opciones_tbl_membresia_abonos  = {
		responsive: false
		, bLengthChange: false
		, bInfo: false
		, bFilter : false
		, bAutoWidth : false
		, columnDefs : []
		, bPaginate: false
		, buttons: []
		//, buttons: [{extend: 'excel', text: 'Exportar a Excel', className: 'btn btn-info btn-sm'},{text:'NUEVO CLIENTE',action:function( e, dt, node, config ) {cliente_mantenimiento_modal('')},className:'btn btn-info btn-sm'}]
		};

function clientes_index_tbl_listarclientes(){
    ws_clientes = ws('sp_cliente' , [''] );

    for(var i= 0 ; i<ws_clientes.length ; i++){
        var cod_cliente = ws_clientes[i].cod_cliente;
        ws_clientes[i][15] = tbl_ext_btn('edit',"cliente_mantenimiento_modal('"+cod_cliente+"')") ;
    }

    //console.log(ws_clientes);
    var tbl = ws_datatable("tbl_clientes", ws_clientes , tbl_cab_cliente , opciones_tbl_cliente);
    
    
}
function cliente_mantenimiento_modal(cod_cliente){
	
	$('#li_perfil a').addClass('active show');
	$('#li_pagos a').attr('aria-selected',true);
	$('#tab_cliente_perfil').addClass('in active show');
	
	$('#li_pagos a').removeClass('active show');	
	$('#li_pagos a').attr('aria-selected',false);
	$('#tab_cliente_pagos').removeClass('in active show');
	
	
	if(cod_cliente != ''){
		cliente_datos = ws('sp_cliente' , [cod_cliente] );
		//console.log(cliente_datos);    	
    	$('#tab_cliente_perfil label').addClass('active');
    	$('#li_pagos').removeClass('active');
    	
    	$('#lb_title').html(cliente_datos[0].nombre);
    	
    	$('#hd_cod_cliente').val(cliente_datos[0].cod_cliente);	   
	    $('#txt_dni').val(cliente_datos[0].dni);
	    $('#txt_nombre').val(cliente_datos[0].nom);
	    $('#txt_appat').val(cliente_datos[0].appat);
	    $('#txt_apmat').val(cliente_datos[0].apmat);
	    $('#txt_fec_nac').val(cliente_datos[0].fecha_nac);
	    $('#cb_sexo').selectpicker('val',cliente_datos[0].sexo);
	    
	    $('#txt_telefono').val(cliente_datos[0].telefono);
	    $('#txt_celular').val(cliente_datos[0].celular);
	    $('#txt_email').val(cliente_datos[0].email);
	    $('#txt_direccion').val(cliente_datos[0].direccion);
	    $('#txt_contact_emergencia').val(cliente_datos[0].contac_emerg);
	    $('#txt_telefono_emergencia').val(cliente_datos[0].telefono_emerg);
	    
	}else{
		$('#li_pagos').addClass('disabled');
	}
	
	$("#modal_clientes_mantenimiento").modal();    
}

function cliente_guardar_perfil(){
	
	cod_cliente = $('#hd_cod_cliente').val();
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
	contac_emerg = $('#txt_contact_emergencia').val();
	telefono_emerg = $('#txt_telefono_emergencia').val();
	
	//console.log( [cod_cliente,nom,appat,apmat,dni,fecha_nac,sexo,telefono,celular,email,direccion,contac_emerg,telefono_emerg]);
	
	var data = ws('sp_reg_cliente' , [cod_cliente,nom,appat,apmat,dni,fecha_nac,sexo,telefono,celular,email,direccion,contac_emerg,telefono_emerg] );
	if( data[0].msj == 'ok'){
		$('#hd_cod_cliente').val(data[0].cod_cliente);
		$('#lb_title').html(nom.toUpperCase() + ' ' + appat.toUpperCase() + ' ' + apmat.toUpperCase());
		toastr.success("Perfil Guardado con exito");
		$('#li_pagos').removeClass('disabled');
		clientes_index_tbl_listarclientes();
    }else{
		toastr.error("Error en el guardado de perfil.");
	}
}

function clientes_index(){
	clientes_index_tbl_listarclientes();
	
	$('#modal_nueva_membresia').on('hide.bs.modal', function () {
		$("#modal_clientes_mantenimiento").modal('show');
    });
	
}

function cliente_nueva_membresia(){
	
	nom = $('#txt_nombre').val();
	appat = $('#txt_appat').val();
	apmat = $('#txt_apmat').val();
	
	var ws_planes = ws('sp_planes' , [''] );
	ws_contenido_combo('cb_modal_nueva_membresia_planes', ws_planes, '');
	
	nombre = nom + ' ' + appat + ' ' + apmat;
	$('#lb_title_nueva_membresia').html("Membresia de "+nombre);
	
	$("#modal_clientes_mantenimiento").modal('hide');    
	$("#modal_nueva_membresia").modal();  
	var tbl = ws_datatable("tbl_membresia_abonos", [] , tbl_cab_membresia_abonos , opciones_tbl_membresia_abonos);
	
}
