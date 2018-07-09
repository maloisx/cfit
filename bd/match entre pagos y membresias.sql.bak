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

