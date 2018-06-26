

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
, buttons: [{extend: 'excel', text: 'Exportar a Excel', className: 'btn btn-info btn-sm'}]
};

function clientes_index_tbl_listarclientes(){
    ws_clientes = ws('sp_cliente' , [''] );

    for(var i= 0 ; i<ws_clientes.length ; i++){
        var cod_cliente = ws_clientes[i].cod_cliente;
        ws_clientes[i].btn1 = tbl_ext_btn('edit',"cliente_mantenimiento_modal('"+cod_cliente+"')") ;
    }

    //console.log(ws_clientes);
    var tbl = ws_datatable("tbl_clientes", ws_clientes , tbl_cab_cliente , opciones_tbl_cliente);
    
    
}
function cliente_mantenimiento_modal(cod_cliente){
    cliente_datos = ws('sp_cliente' , [cod_cliente] );
    console.log(cliente_datos);
    $('#lb_title').html(cliente_datos[0].nombre);
    $("#modal_clientes_mantenimiento").modal(); 
}

function clientes_index(){
	clientes_index_tbl_listarclientes();
}