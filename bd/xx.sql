##################
##verificamos que la tabla de ingreso de caja tenga los ids sin duplicidad
select icm.* , ( select count(c.cod_cliente) 
                    from cliente c 
                     where concat(trim(c.nom) , ' ' , trim(c.appat),' ',trim(c.dni)) = concat(trim(icm.cliente),' ',icm.dni) ) as cod_cliente
    ,  ( select  count(mx.cod_metpago) from metodo_pago mx where mx.nom_metpago = icm.metodo_pago ) cod_metodo_pago
		,   ( select  count(cpx.cod_comprobante) from comprobante cpx where cpx.nom_comprobante = icm.compro_pago )cod_comprobante
	  ,   ( select  count(px.cod_plan) from plan px where trim(px.nom_plan) = trim(icm.plan) )  cod_plan
		,  ( select  count(ppx.cod_personal) from personal ppx where ppx.nom = icm.vendedor )cod_vendedor
from  _fitco_ingresos_caja_por_membresia icm
where cod_cliente > 1 or cod_vendedor > 1 or cod_metodo_pago > 1 or cod_comprobante > 1 or cod_plan > 1;

##actualizamos los id
update _fitco_ingresos_caja_por_membresia icm
set cod_cliente = ( select c.cod_cliente
                    from cliente c 
                     where concat(trim(c.nom) , ' ' , trim(c.appat)) = concat(trim(icm.cliente)) )
    , cod_metodo_pago = ( select  mx.cod_metpago from metodo_pago mx where mx.nom_metpago = icm.metodo_pago ) 
		, cod_comprobante = ( select  cpx.cod_comprobante from comprobante cpx where cpx.nom_comprobante = icm.compro_pago )
	  , cod_plan = ( select  px.cod_plan from plan px where trim(px.nom_plan) = trim(icm.plan) )  
		, cod_vendedor = ( select ppx.cod_personal from personal ppx where ppx.nom = icm.vendedor );


