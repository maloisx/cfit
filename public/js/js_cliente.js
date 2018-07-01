

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
, aoColumnDefs : [{ "visible": false, "targets": [0,2,3,4,7,8,9,10,11,12,13,14] }]
, bPaginate: true
//, buttons: []
, buttons: [{extend: 'excel', text: 'Exportar a Excel', className: 'btn btn-info btn-sm'},{text:'NUEVO CLIENTE',action:function( e, dt, node, config ) {cliente_mantenimiento_modal('')},className:'btn btn-info btn-sm'}]
};


var tbl_cab_membresia_abonos = [ {
    'sTitle' : 'MONTO',
    "sWidth" : "12%"
},{
    'sTitle' : 'MET. PAGO',
    "sWidth" : "25%"
}, {
    'sTitle' : 'TIP. COMPRO.',
    "sWidth" : "25%"
},{
    'sTitle' : 'NRO COMPRO.',
    "sWidth" : "15%"
},{
    'sTitle' : 'FEC. PAGO.',
    "sWidth" : "15%"
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
		, bSort : false
		, bAutoWidth : false
		//, aoColumnDefs :  { "Sortable": false, "targets": [ 0 ,1,2,3,4 ] }
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
		$('#li_pagos').removeClass('disabled');
    	
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
		
		cliente_datos_membresias = ws('sp_obt_cliente_membresia' , [cod_cliente,''] );
		console.log(cliente_datos_membresias);
		
		var card_resumen_membresia = "";
		if(cliente_datos_membresias != null){
			for(var x = 0; x < cliente_datos_membresias.length ; x++ ){
				var card =  '<div class="card card-body">  '+
							'	<div class="row">  '+
							'		<div class="col-md-9">	 '+
							'			<p class="font-weight-bold">'+cliente_datos_membresias[x]['nom_plan']+' / '+cliente_datos_membresias[x]['nom_tipo_membresia']+'</p>  '+
							'		</div>  '+
							'		<div class="col-md-3 text-right">	'+
							'			<span id="btn_modal_membresia_detalle" onclick="cliente_nueva_membresia('+cliente_datos_membresias[x]['cod_venta_membresia']+')" class="badge light-blue"><i class="fa fa-search fa-2x" aria-hidden="true"></i></span>  '+ 									
							'		</div>  '+						
							'	</div>  '+
							'	<div class="row"> '+
							'		<div class="col-md-4 border-right">	 '+										
							'			<div class="row"> '+
							'				<div class="col-md-12"> '+
							'					<label class="font-weight-bold"><span class="badge light-blue"><i class="fa fa-calendar fa-2x" aria-hidden="true"></i></span></label> '+
							'					<label id="lbl_membresia_xxx_duracion">'+cliente_datos_membresias[x]['fecha_inicio_plan']+' - '+cliente_datos_membresias[x]['fecha_fin_plan']+'</label> '+
							'				</div> '+
							'				<div class="col-md-12"> '+
							'					<label class="font-weight-bold"><span class="badge light-blue"><i class="fa fa-flag-checkered fa-2x" aria-hidden="true"></i></span></label> '+
							'					<label id="lbl_membresia_xxx_sesiones">0 sesiones de '+cliente_datos_membresias[x]['nro_sesiones']+' </label> '+
							'				</div> '+
							'				<div class="col-md-12"> '+
							'					<label class="font-weight-bold"><span class="badge light-blue"><i class="fa fa-snowflake-o fa-2x" aria-hidden="true"></i></span></label> '+
							'					<label id="lbl_membresia_xxx_freeze">0 dias congelados de '+cliente_datos_membresias[x]['nro_dias_freezee']+'</label> '+
							'				</div> '+
							'			</div> '+										
							'		</div> '+
							'		<div class="col-md-4 border-right">	 '+
							'			<div class="row"> '+
							'				<div class="col"> '+
							'					<p class="font-weight-bold">Precio:</p> '+
							'					<p id="lbl_membresia_xxx_precio">'+cliente_datos_membresias[x]['precio']+'</p> '+
							'				</div> '+
							'				<div class="col"> '+
							'					<p class="font-weight-bold">Pagado:</p> '+
							'					<p id="lbl_membresia_xxx_pagado">'+cliente_datos_membresias[x]['monto_pagado']+'</p> '+
							'				</div> '+
							'				<div class="col"> '+
							'					<p class="font-weight-bold">Deuda:</p> '+
							'					<p id="lbl_membresia_xxx_deuda">'+cliente_datos_membresias[x]['deuda']+'</p> '+
							'				</div> '+
							'			</div> '+
							'		</div>	 '+
							'		<div class="col-md-4">	 '+
							'			<div class="row"> '+
							'				<div class="col-md-12"> '+
							'					<label class="font-weight-bold">Disciplina:</label> '+
							'					<label id="lbl_membresia_xxx_disciplina">'+cliente_datos_membresias[x]['nom_disciplina']+'</label> '+
							'				</div> '+
							'				<div class="col-md-12"> '+
							'					<label class="font-weight-bold">Disc. Extras:</label> '+
							'					<label id="lbl_membresia_xxx_disciplina_extras">'+cliente_datos_membresias[x]['disciplina_extras']+'</label> '+
							'				</div> '+
							'			</div> '+
							'		</div> '+			
							'	</div> '+
							'</div>';
				card_resumen_membresia += card;
			}
			$('#div_resumen_cliente_membresias').html(card_resumen_membresia);
		}



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


function cliente_nueva_membresia(codmembresia){

	console.log(codmembresia);
	var cod_cliente = $('#hd_cod_cliente').val();
	var nom = $('#txt_nombre').val();
	var appat = $('#txt_appat').val();
	var apmat = $('#txt_apmat').val();

	$('#hd_cod_membresia').val(codmembresia);	
	$('#lb_title_nueva_membresia').html("Membresia de "+nom + ' ' + appat + ' ' + apmat);

	var ws_planes = ws('sp_planes' , [''] );
	var ws_disciplinas = ws('sp_disciplinas' , '' );
	var ws_tipo_membresia = ws('sp_tipo_membresia' , '' );
	var ws_vendedores = ws('sp_vendedores' , '' );
	
	var v_cod_plan = '';
	var v_cod_disciplinas_extras = '';
	var v_cod_tipo_membresia = '';
	var v_cod_vendedor = '';
	var v_descuento = '0';

	if(codmembresia != ''){
		datos_membresia = ws('sp_obt_cliente_membresia' , [cod_cliente, codmembresia] );
		datos_membresia_det_pago = ws('sp_obt_membresia_detpag' , [codmembresia] );
	
		v_cod_plan = datos_membresia[0]['cod_plan'];
		v_cod_disciplinas_extras = datos_membresia[0]['cod_disciplina_extras'].split(",");
		v_cod_tipo_membresia = datos_membresia[0]['cod_tipo_membresia'];
		v_cod_vendedor = datos_membresia[0]['cod_vendedor'];
		v_descuento = datos_membresia[0]['descuento_mon'];
		$('#txt_membresia_fecha_inicio').val(datos_membresia[0]['fecha_inicio_plan']); 		
	}

	$("#modal_clientes_mantenimiento").modal('hide');    
	$("#modal_nueva_membresia").modal();

	ws_contenido_combo('cb_modal_nueva_membresia_planes', ws_planes, v_cod_plan);	
	ws_contenido_combo('cb_membresia_disciplina_extras', ws_disciplinas, v_cod_disciplinas_extras);	
	ws_contenido_combo('cb_membresia_tipo_membresia', ws_tipo_membresia, v_cod_tipo_membresia);	
	ws_contenido_combo('cb_membresia_vendedor', ws_vendedores, v_cod_vendedor);
	ws_datatable("tbl_membresia_abonos", [] , tbl_cab_membresia_abonos , opciones_tbl_membresia_abonos);
	$('#txt_membresia_descuento_moneda').val(v_descuento);

	console.log($("#cb_modal_nueva_membresia_planes").val());

	$("#cb_modal_nueva_membresia_planes").change(function(){
		var nueva_membresia_planes = $(this).val();
		var ws_plan = ws('sp_planes' , [nueva_membresia_planes] );
		var ws_plan_disciplina_extras = ws('sp_plan_disciplina_extra' , [nueva_membresia_planes] );

		var disc_extras = [];
		if(ws_plan_disciplina_extras != null){
			console.log(ws_plan_disciplina_extras);
			for(var i = 0 ; i < ws_plan_disciplina_extras.length ; i++){
				disc_extras.push(ws_plan_disciplina_extras[i]['cod_disciplina']);	
			}
			$('#cb_membresia_disciplina_extras').val(disc_extras);
			$('#cb_membresia_disciplina_extras').selectpicker('render');
		}

		//console.log(ws_plan);
		$('.lbl').addClass('active');
		$('#txt_membresia').val(ws_plan[0]['nom_plan']);
		$('#txt_membresia_disciplina_principal').val(ws_plan[0]['nom_disciplina']);
		$('#txt_membresia_precio').val(ws_plan[0]['precio']);
		$('#txt_membresia_sesiones').val(ws_plan[0]['nro_sesiones']);
		$('#txt_membresia_freeze').val(ws_plan[0]['nro_dias_freezee']);
		$('#txt_membresia_precio_final').val(ws_plan[0]['precio'] - $('#txt_membresia_descuento_moneda').val());

		$('#div_content_nueva_membresia').show();
		$('#div_content_nueva_membresia_btn_guardar').show();
	});

	$("#txt_membresia_descuento_moneda").change(function(){
		var monto_descuento = $(this).val();
		var precio = $('#txt_membresia_precio').val();

		var monto_final = precio - monto_descuento;
		if(monto_final < 0){
			toastr.error('Monto final es menor a 0.');
		}else{
			$('#txt_membresia_precio_final').val(monto_final);
		}

	});

	if(codmembresia != ''){
		console.log('entroooooo');
		$("#cb_modal_nueva_membresia_planes" ).trigger( "change" );
		if(datos_membresia_det_pago){
			for(var i = 0 ; i <datos_membresia_det_pago.length ; i++){
				cliente_membresia_anidir_abono(
												datos_membresia_det_pago[i]['monto']
												,datos_membresia_det_pago[i]['cod_metpago']
												,datos_membresia_det_pago[i]['cod_comprobante']
												,datos_membresia_det_pago[i]['nro_comprobante']
												,datos_membresia_det_pago[i]['fecha_pago']
												);	
			}
		}			
	}
	if(codmembresia == ''){
		$('#div_content_nueva_membresia').hide();
		$('#div_content_nueva_membresia_btn_guardar').hide();
	}


}

function cliente_membresia_anidir_abono(
									    v_monto 
									  , cod_met_pago 
									  , cod_tipo_comprobante 
									  , v_nro_comprobante 
									  , v_fecha_pago
									  ){
	
	ws_met_pago = ws('sp_metodo_pago' , '' );
	ws_tipo_comprobante = ws('sp_comprobante' , '' ); 
	
	var cb_membresia_abono_met_pago = ws_contenido_combo('', ws_met_pago, cod_met_pago);
	var cb_membresia_abono_comprobante = ws_contenido_combo('', ws_tipo_comprobante, cod_tipo_comprobante);
	
	var n = parseInt(Math.random() * 99999 + 1);
	var row = [	'<input type="hidden" class="class_abonos" value="'+n+'" > <input type="text" id="txt_membresia_abono_'+n+'_monto" class="form-control" value="'+v_monto+'">'
	          , '<select class="selectpicker" id="cb_membresia_abono_'+n+'_met_pago" data-size="10" data-live-search="false" data-width="100%" data-actions-box="false">'+cb_membresia_abono_met_pago+'</select>'
	          , '<select class="selectpicker" id="cb_membresia_abono_'+n+'_tipo_comprobante" data-size="10" data-live-search="false" data-width="100%" data-actions-box="false">'+cb_membresia_abono_comprobante+'</select>'
	          , '<input type="text" id="txt_membresia_abono_'+n+'_nro_comprobante" class="form-control" value="'+v_nro_comprobante+'">'
	          , '<input type="date" id="txt_membresia_abono_'+n+'_fecha_pago" class="form-control" value="'+v_fecha_pago+'">' 
	          ,'<span class="fa fa-remove row_'+n+'" onclick="cliente_membresia_eliminar_abono('+n+')"></span>' ];
	//tbl_data_abono.push(row);
	
	//var tbl = ws_datatable("tbl_membresia_abonos", tbl_data_abono , tbl_cab_membresia_abonos , opciones_tbl_membresia_abonos);
	
	var tbl = $('#tbl_dt_tbl_membresia_abonos').dataTable();	
	tbl.fnAddData( row );
	
	$('.selectpicker').selectpicker({style: 'btn-info'});
}

function cliente_membresia_eliminar_abono(n){
	//console.log(n);
	var tbl = $('#tbl_dt_tbl_membresia_abonos').dataTable();	
	var nNodes = tbl.fnGetNodes( );
//	console.log(nNodes);
	var pos = null;
	for(var i= 0 ; i<nNodes.length ; i++){
		var row = nNodes[i];
		var str = row.innerHTML;
		if(str.search("row_"+n) > -1 ){
			pos = i;
			break;
		}
	}
	console.log(n + " -> row : " + pos );
	tbl.fnDeleteRow( pos );
	tbl.fnDraw();
}

function cliente_membresia_guardar(){
	var cod_membresia = $('#hd_cod_membresia').val();
	var cod_cliente = $('#hd_cod_cliente').val();
	var cod_plan = $('#cb_modal_nueva_membresia_planes').val();
	var membresia_precio = $('#txt_membresia_precio').val();
	var membresia_disciplinas_extras = $('#cb_membresia_disciplina_extras').val();
	var membresia_tipo_membresia = $('#cb_membresia_tipo_membresia').val();
	var membresia_fecha_ini = $('#txt_membresia_fecha_inicio').val(); 
	var membresia_descuento_moneda = $('#txt_membresia_descuento_moneda').val();
	var membresia_vendedor = $('#cb_membresia_vendedor').val();
	var membresia_estado = $('#cb_membresia_estado').val();

	var abonos = [];
	$( ".class_abonos" ).each(function( index ) {
		var n= $( this ).val();	
		var item = [];
		item[0] = $('#txt_membresia_abono_'+n+'_monto').val();
		item[1] = $('#cb_membresia_abono_'+n+'_met_pago').val();
		item[2] = $('#cb_membresia_abono_'+n+'_tipo_comprobante').val();
		item[3] = $('#txt_membresia_abono_'+n+'_nro_comprobante').val();
		item[4] = $('#txt_membresia_abono_'+n+'_fecha_pago').val();
		abonos.push(item.join(','));
	  });

	var params = [ cod_membresia
				, cod_cliente
				, cod_plan
				, membresia_precio 
				, membresia_disciplinas_extras.join(',')
				, membresia_tipo_membresia
				, membresia_fecha_ini
				, membresia_descuento_moneda
				, membresia_vendedor
				, abonos.join('|')
				, membresia_estado
				];
	console.log(params);
	var data = ws('sp_reg_cliente_membresia' , params );
	if( data[0].msj == 'ok'){
		$('#hd_cod_membresia').val(data[0].cod_membresia);
		toastr.success("Membresia Guardado con exito");	
    }else{
		toastr.error("Error en el guardado Membresia.");
	}
}

