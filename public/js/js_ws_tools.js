
function ws_contenido_combo(cb_id_html, data, id_seleccionado) {
    /*llenado de combo dando por hecho q la data solo tiene dos columnas 1 = id , 2 = desc*/
    //cb_id_html = "cb_prueba";
    //id_seleccionado = "";
    cont_combo = "";
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        
        ind = 0;
        id = null;
        val = null;

        if(typeof item === 'object'){
           /* $.each(item, function (index_item, value_item) {
                if (ind == 0) {
                    id = value_item;
                    ind++;
                } else if (ind == 1) {
                    val = value_item;
                }
            });*/
            id = item[0];
            val = item[1];
            //console.log(id + '->'+val);
        }else{
            id = item;
            val = item;
        }




        //console.log(id + " // " + val);
        if (id_seleccionado == id) {
            cont_combo += "<option value='" + id + "' selected='selected' >" + val + "</option>";
        } else {
            cont_combo += "<option value='" + id + "'>" + val + "</option>";
        }
    }
    //console.log(cont_combo);
    
    if(cb_id_html != '') {
        $('#' + cb_id_html).html(cont_combo);        
        $('#' + cb_id_html).selectpicker('refresh');
        $('#' + cb_id_html).selectpicker('val', id_seleccionado);
    }else{
    	return cont_combo;
    }    
}




function ws_datatable(id_div_tbl, data, tbl_cab, opciones) {

    if(opciones == undefined) opciones = {};

    var opciones_default = {
        responsive: true
        , bFilter: true
        , bLengthChange: false
        , bInfo: false
        , bPaginate: false
        , bAutoWidth : true
        , aoColumnDefs : []
        , bSort: true                
        //, dom: "Blfrtip"
        , dom: '<"row"<"col-6"B><"col-6 float-right"f>><"row"<"col-12 "p>>rt<"bottom"><"clear">'
        , buttons: [{extend: 'excel', text: 'Exportar a Excel', className: 'btn btn-info btn-sm'}]
    };

    var tbl_data = [];
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var tbl_row = [];
        $.each(item, function (index_item, value_item) {
            if(!isNaN(index_item))
                tbl_row.push(value_item);
        });
        
        tbl_data.push(tbl_row);
    }
   // console.log(tbl_data);

    var tbl_n = parseInt(Math.random() * 99999 + 1);
//    var html_tbl = "<table border='1' class='table table-striped table-bordered dt-responsive' id='tbl_dt_" + tbl_n + "'></table>";
    
    var tbl_responsive = "";
    var b_responsibe = true;
        if(opciones.responsive != undefined){
            b_responsibe = opciones.responsive;
        }else{
            b_responsibe = opciones_default.responsive;
        }
        
        if(b_responsibe == true){
            tbl_responsive = "dt-responsive";
        }
             

    var html_tbl = "<table border='1' class='table table-striped table-bordered "+ tbl_responsive + "' style='width:100%;' id='tbl_dt_" + id_div_tbl + "'></table>";

    $('#' + id_div_tbl).html(html_tbl);
        
       var tbl = $('#tbl_dt_' + id_div_tbl).dataTable({
        "bFilter": (opciones.bFilter != undefined)?opciones.bFilter : opciones_default.bFilter,
        "bLengthChange": (opciones.bLengthChange != undefined)?opciones.bLengthChange : opciones_default.bLengthChange,
        "bInfo": (opciones.bInfo != undefined)?opciones.bInfo : opciones_default.bInfo,
        "bPaginate": (opciones.bPaginate != undefined)?opciones.bPaginate : opciones_default.bPaginate,
        "bScrollCollapse": true,
        //"sScrollY": '93%', 
        "aoColumns": tbl_cab,
        "bSort" : (opciones.bSort != undefined)?opciones.bSort : opciones_default.bSort,
        "bAutoWidth": (opciones.bAutoWidth != undefined)?opciones.bAutoWidth : opciones_default.bAutoWidth,
        "aoColumnDefs" : (opciones.aoColumnDefs != undefined)?opciones.aoColumnDefs : opciones_default.aoColumnDefs,
        "aaData": tbl_data,
        "fixedColumns": true,
        "dom": (opciones.dom != undefined)?opciones.dom : opciones_default.dom,
        "buttons": (opciones.buttons != undefined)?opciones.buttons : opciones_default.buttons,
        "language": {'url': '/cfit/public/datatables/Spanish.json'}
    });
    
    tbl.$('tr').hover(function () {
        $(this).addClass('highlighted');
    }, function () {
        tbl.$('tr.highlighted').removeClass('highlighted');
    });

    return tbl;
}

function tbl_ext_btn(name_btn, func) {

    var btn_n = parseInt(Math.random() * 99999 + 1);
    if (func != undefined) {
//        html_btn = '<button id="btn_' + btn_n + '" onclick="' + func + '" type="button" class="btn btn-info"><span class="fa fa-' + name_btn + '"></span></button>';
        //html_btn = '<a id="btn_' + btn_n + '" onclick="' + func + '" class="btn-floating btn-sm blue-gradient"><i class="fa fa-' + name_btn + '"></i></a>';
    	html_btn = '<span id="btn_' + btn_n + '" onclick="' + func + '" class="badge light-blue"><i class="fa fa-' + name_btn + ' fa-2x" aria-hidden="true"></i></span>';
    } else {
//        html_btn = '<button id="btn_' + btn_n + '" type="button" class="btn btn-info" onclick=""><span class="fa fa-' + name_btn + '"></span></button>';
        //html_btn = '<a id="btn_' + btn_n + '" class="btn-floating btn-sm blue-gradient"><i class="fa fa-' + name_btn + '"></i></a>';
    	html_btn = '<span id="btn_' + btn_n + '" class="badge light-blue"><i class="fa fa-' + name_btn + ' fa-2x" aria-hidden="true"></i></span>';
    }
    return html_btn;
}