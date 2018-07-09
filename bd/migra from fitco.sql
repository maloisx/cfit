##tablas inicialaes
#delete from _fitco_informacion_de_clientes;
#delete from _fitco_venta_de_membresias;
#delete from _fitco_ingresos_caja_por_membresia_inicial_fitco

##############################################################################################################################
#delet clientes
delete from clase_cliente;
delete from venta_membresias_disc_extras;
delete from venta_membresia_detpag;
delete from venta_membresia;
delete from cliente;
##############################################################################################################################
#verificamos duplicidad de clientes
select * 
from _fitco_informacion_de_clientes
where ( nombre , apellido  ) in (
SELECT
fic.nombre,
fic.apellido
FROM
_fitco_informacion_de_clientes AS fic 
group by fic.nombre,
fic.apellido
having count(*) > 1)
order by nombre, apellido;
############################################################
#eliminamos los duplicados que veamos convenientes
############################################################
delete from _fitco_informacion_de_clientes where id in (58783,58830,59083,58700);
#insertamos los clientes
insert into cliente(cod_cliente,nom,appat,dni,email,telefono,celular,sexo,fecha_nac)
SELECT
@rownum:=@rownum+1 AS rownum ,
fic.nombre,
fic.apellido,
IF(LENGTH(fic.dni)>8, SUBSTR(fic.dni FROM 0 FOR 8), fic.dni) *1 as dni,
fic.email,
fic.telefono,
fic.celular,
fic.genero,
STR_TO_DATE(fic.fecha_nac, '%d/%m/%Y') as fecha_nac
FROM
_fitco_informacion_de_clientes AS fic ,(SELECT @rownum:=0 ) r ;
##############################################################################################################################
#insertar las cabeceras de las membresias
insert into venta_membresia ( cod_venta_membresia,cod_cliente,cod_plan,cod_tipo_membresia,fecha_inicio_plan
															,precio,descuento_mon,decuento_proc,cod_vendedor,cod_estado )
select @rownum:=@rownum+1 AS rownum , t.*
from(
SELECT distinct 
c.cod_cliente,
p.cod_plan,
tm.cod_tipo_membresia,
STR_TO_DATE(fvm.fecha_ini_plan, '%d/%m/%Y') as fecha_ini_plan ,
fvm.precio,
if(fvm.descuento='',0,ifnull(fvm.descuento,0) ) as descuento,
0 as desc_porc,
1 as cod_vendedor,
1 as estado
FROM
_fitco_venta_de_membresias AS fvm 
left join cliente AS c on concat(trim(c.nom) , ' ' , trim(c.appat)) = concat(trim(fvm.nombre),' ',trim(fvm.apellido))
left join tipo_membresia tm on tm.nom_tipo_membresia = fvm.tipo_membresia
left join plan p on p.nom_plan = fvm.plan
) t
,(SELECT @rownum:=0 ) r
order by fecha_ini_plan desc
#################################################################################################
##proceso para detalle de venta
###verificamos pagos duplicados...
create TABLE _fitco_ingresos_caja_por_membresia 
SELECT DISTINCT
icm.fecha_pago,
icm.monto_pagado,
icm.metodo_pago,
icm.compro_pago,
icm.nro_comprobante,
icm.cliente,
icm.dni,
icm.plan,
icm.disciplinas,
icm.vendedor,
icm.cod_cliente,
icm.cod_metodo_pago,
icm.cod_comprobante,
icm.cod_plan,
icm.cod_vendedor,
icm.cod_venta_membresia
FROM
_fitco_ingresos_caja_por_membresia_inicial_fitco AS icm


##########################################################################################
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
########################################################################
##actualizamos los id
update _fitco_ingresos_caja_por_membresia icm
set cod_cliente = ( select c.cod_cliente
                    from cliente c 
                     where concat(trim(c.nom) , ' ' , trim(c.appat)) = concat(trim(icm.cliente)) )
    , cod_metodo_pago = ( select  mx.cod_metpago from metodo_pago mx where mx.nom_metpago = icm.metodo_pago ) 
		, cod_comprobante = ( select  cpx.cod_comprobante from comprobante cpx where cpx.nom_comprobante = icm.compro_pago )
	  , cod_plan = ( select  px.cod_plan from plan px where trim(px.nom_plan) = trim(icm.plan) )  
		, cod_vendedor = ( select  ppx.cod_personal from personal ppx where ppx.nom = icm.vendedor );
############################################################################################################
## verificamos id de clientes
SELECT
icm.cliente,
concat(cliente.nom,' ',cliente.appat),
(case when icm.cliente = concat(cliente.nom,' ',cliente.appat) then 1 else 0 end ) as e
FROM
_fitco_ingresos_caja_por_membresia AS icm
left JOIN cliente ON icm.cod_cliente = cliente.cod_cliente
where (case when icm.cliente = concat(cliente.nom,' ',cliente.appat) then 1 else 0 end ) = 0
############################################################################################################
#creamos el match inicial
drop table _fitco_venta_detalle_1;
drop table _fitco_venta_detalle_1_resumen;

create table _fitco_venta_detalle_1
SELECT 
vm.cod_venta_membresia,
STR_TO_DATE(icm.fecha_pago, '%d/%m/%Y') as fecha_pago, 
icm.cod_metodo_pago,
icm.cod_comprobante,
icm.nro_comprobante,
icm.monto_pagado,

'//////' as d1,
icm.cod_cliente,
icm.cod_plan,
icm.cliente,
'//////' as d2,
vm.fecha_inicio_plan,
vm.precio,
vm.descuento_mon,
(vm.precio - vm.descuento_mon ) as venta_monto_pagado,
'//////',
(vm.precio - vm.descuento_mon) - icm.monto_pagado
FROM
_fitco_ingresos_caja_por_membresia AS icm
left join venta_membresia vm
on icm.cod_cliente = vm.cod_cliente
and icm.cod_plan = vm.cod_plan
#and icm.monto_pagado = vm.precio - vm.descuento_mon
and (STR_TO_DATE(icm.fecha_pago, '%d/%m/%Y') between vm.fecha_inicio_plan and date_add(vm.fecha_inicio_plan, INTERVAL 25 DAY));
#where icm.cod_cliente = 519 #452

##creamos un resumen de los datos
create table _fitco_venta_detalle_1_resumen
select distinct 
YEAR(tx.fecha_pago) as anio
, tx.nro_comprobante 
, tx.cod_cliente, tx.cod_venta_membresia
from _fitco_venta_detalle_1 tx 
where tx.nro_comprobante <> ''
AND tx.cod_venta_membresia is not null
#and tx.nro_comprobante  = '0001-000530'

####################################################
##actualizar boletas 
update _fitco_venta_detalle_1 tx SET
 cod_venta_membresia = ( select distinct r.cod_venta_membresia from _fitco_venta_detalle_1_resumen r 
													where r.anio = YEAR(tx.fecha_pago) 
														and r.nro_comprobante = tx.nro_comprobante 
														and r.cod_cliente = tx.cod_cliente 
														and (r.anio , r.nro_comprobante, r.cod_cliente ) not in ( select r.anio ,  r.nro_comprobante , r.cod_cliente
																																											from _fitco_venta_detalle_1_resumen r
																																											group by r.anio ,  r.nro_comprobante, r.cod_cliente
																																											having count(*)  > 1 )
												)
where tx.cod_venta_membresia is null;
######################################################
##ingresamos el detalle de los pagos
insert into venta_membresia_detpag(cod_venta_membresia,
																		fecha_pago,
																		cod_metpago,
																		cod_comprobante,
																		nro_comprobante,
																		monto) 
SELECT
fvd.cod_venta_membresia,
fvd.fecha_pago,
fvd.cod_metodo_pago,
fvd.cod_comprobante,
fvd.nro_comprobante,
sum(fvd.monto_pagado)
FROM
_fitco_venta_detalle_1 AS fvd
where fvd.cod_venta_membresia is not null
group by fvd.cod_venta_membresia,
fvd.fecha_pago,
fvd.cod_metodo_pago,
fvd.cod_comprobante,
fvd.nro_comprobante;

