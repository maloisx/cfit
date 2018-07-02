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
, aoColumnDefs : [{ "visible": false, "targets": [0] }]
//, bPaginate: true
//, buttons: []
, buttons: [{text:'NUEVO DISCIPLINA',action:function( e, dt, node, config ) {disciplina_mantenimiento_modal('');},className:'btn btn-info btn-sm'}]
};

function mantenimiento_disciplinas_tbl_listar(){
	
	ws_disciplina = ws('sp_disciplinas' , [''] );

    for(var i= 0 ; i<ws_disciplina.length ; i++){
        var cod_disciplina = ws_disciplina[i].cod_disciplina;
        ws_disciplina[i][4] = tbl_ext_btn('edit',"disciplina_mantenimiento_modal('"+cod_disciplina+"')") ;        
        ws_disciplina[i][3] = ws_disciplina[i]['color'] = '<div class="form-group"><input readonly class="form-control" type="color" value="'+ws_disciplina[i].color+'" id="example-color-input"></div>';
    }

    console.log(ws_disciplina);
    var tbl = ws_datatable("div_tbl_disciplinas", ws_disciplina , tbl_listardisciplinas_cab , tbl_listardisciplinas_opciones);
}

function mantenimiento_disciplinas(){
	mantenimiento_disciplinas_tbl_listar();
}

function disciplina_mantenimiento_modal(cod_disciplina){
	ws_disciplina = ws('sp_disciplinas' , [cod_disciplina] );
	console.log(ws_disciplina);
	$('#modal_mantenimiento_disciplina').modal();
}

/* **************************************************************************************************************************************************************** */
/* **************************************************************************************************************************************************************** */