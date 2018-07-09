
## ingresos mensuales por disciplina ultimo año
SELECT
d.nom_disciplina,
CONCAT( YEAR(vd.fecha_pago),'-',LPAD(MONTH(vd.fecha_pago),2,'0') ) ,  
SUM(vd.monto) as ingresos
FROM
venta_membresia AS v
INNER JOIN venta_membresia_detpag AS vd ON vd.cod_venta_membresia = v.cod_venta_membresia
INNER JOIN plan AS p ON v.cod_plan = p.cod_plan
INNER JOIN disciplina AS d ON p.cod_disciplina = d.cod_disciplina
INNER JOIN ( select max(xx.fecha_pago) AS fp_max  from venta_membresia_detpag xx ) x
where vd.fecha_pago BETWEEN  concat(year(x.fp_max) - 1,'-',LPAD(MONTH(x.fp_max),2,'0'),'-01' ) and now()
group by 
d.nom_disciplina,
CONCAT( YEAR(vd.fecha_pago),'-',LPAD(MONTH(vd.fecha_pago),2,'0') )
order by d.nom_disciplina,  CONCAT( YEAR(vd.fecha_pago),'-',LPAD(MONTH(vd.fecha_pago),2,'0') ) desc 


## ingresos por dia
SELECT
d.nom_disciplina,
SUM(vd.monto) as ingresos
FROM
disciplina AS d
INNER JOIN plan AS p ON p.cod_disciplina = d.cod_disciplina
INNER JOIN venta_membresia AS v ON v.cod_plan = p.cod_plan
INNER JOIN venta_membresia_detpag AS vd ON vd.cod_venta_membresia = v.cod_venta_membresia AND vd.fecha_pago = NOW()
group by 
d.nom_disciplina
order by d.nom_disciplina;

##deuda por cobrar lista
	SELECT 
	v.cod_venta_membresia,
  v.cod_cliente,  
  concat(ifnull(c.nom,'') , ' ' , ifnull(c.appat,'') , ' ' , ifnull(c.apmat,'') ) as cliente,
	d.nom_disciplina,
	(v.precio - v.descuento_mon) AS precio_memb,
	ifnull(sum(vd.monto),0) AS ingresos ,
	((v.precio - v.descuento_mon) - ifnull(sum(vd.monto),0) ) deuda
	FROM
	venta_membresia AS v
  left JOIN cliente AS c ON v.cod_cliente = c.cod_cliente
	left JOIN venta_membresia_detpag AS vd ON vd.cod_venta_membresia = v.cod_venta_membresia
	left JOIN plan AS p ON v.cod_plan = p.cod_plan
	left JOIN disciplina AS d ON p.cod_disciplina = d.cod_disciplina

	group by 
	v.cod_venta_membresia,
  v.cod_cliente,
  concat(c.nom , ' ' , c.appat , ' ' , c.apmat )  ,
	d.nom_disciplina,
	(v.precio - v.descuento_mon) ;

##deuda por cobrar resumen
select nom_disciplina , sum(deuda)
FROM(
	SELECT 
	v.cod_venta_membresia,
  v.cod_cliente,  
  concat(ifnull(c.nom,'') , ' ' , ifnull(c.appat,'') , ' ' , ifnull(c.apmat,'') ) as cliente,
	d.nom_disciplina,
	(v.precio - v.descuento_mon) AS precio_memb,
	ifnull(sum(vd.monto),0) AS ingresos ,
	((v.precio - v.descuento_mon) - ifnull(sum(vd.monto),0) ) deuda
	FROM
	venta_membresia AS v
  left JOIN cliente AS c ON v.cod_cliente = c.cod_cliente
	left JOIN venta_membresia_detpag AS vd ON vd.cod_venta_membresia = v.cod_venta_membresia
	left JOIN plan AS p ON v.cod_plan = p.cod_plan
	left JOIN disciplina AS d ON p.cod_disciplina = d.cod_disciplina

	group by 
	v.cod_venta_membresia,
  v.cod_cliente,
  concat(c.nom , ' ' , c.appat , ' ' , c.apmat )  ,
	d.nom_disciplina,
	(v.precio - v.descuento_mon) 
) x
where x.deuda > 0
group by nom_disciplina;

##activos
select * 
FROM
(
SELECT
#v.cod_venta_membresia,
#v.cod_cliente,
concat(ifnull(c.nom,'') , ' ' , ifnull(c.appat,'') , ' ' , ifnull(c.apmat,'') ) AS cliente,
d.nom_disciplina,
p.nom_plan,
tm.nom_tipo_membresia,
v.fecha_inicio_plan,
DATE_ADD(DATE_ADD(v.fecha_inicio_plan,INTERVAL p.duracion_meses MONTH) , INTERVAL p.duracion_dias DAY ) as fecha_fin_plan,
( case when now() >= v.fecha_inicio_plan and now() <= DATE_ADD(DATE_ADD(v.fecha_inicio_plan,INTERVAL p.duracion_meses MONTH) , INTERVAL p.duracion_dias + 1 DAY ) then 1 else 0 end ) as activo
FROM
venta_membresia AS v
INNER JOIN plan AS p ON v.cod_plan = p.cod_plan
INNER JOIN disciplina AS d ON p.cod_disciplina = d.cod_disciplina
INNER JOIN cliente AS c ON v.cod_cliente = c.cod_cliente
INNER JOIN tipo_membresia AS tm ON tm.cod_tipo_membresia = v.cod_tipo_membresia
WHERE
v.cod_estado = 1
)x 
where activo = 1
order by fecha_fin_plan desc

##activos resumen

select nom_disciplina , count(activo) 
FROM
(
SELECT
#v.cod_venta_membresia,
#v.cod_cliente,
concat(ifnull(c.nom,'') , ' ' , ifnull(c.appat,'') , ' ' , ifnull(c.apmat,'') ) AS cliente,
d.nom_disciplina,
p.nom_plan,
tm.nom_tipo_membresia,
v.fecha_inicio_plan,
DATE_ADD(DATE_ADD(v.fecha_inicio_plan,INTERVAL p.duracion_meses MONTH) , INTERVAL p.duracion_dias DAY ) as fecha_fin_plan,
( case when now() >= v.fecha_inicio_plan and now() <= DATE_ADD(DATE_ADD(v.fecha_inicio_plan,INTERVAL p.duracion_meses MONTH) , INTERVAL p.duracion_dias + 1 DAY ) then 1 else 0 end ) as activo , 
p.duracion_meses,
p.duracion_dias
FROM
venta_membresia AS v
INNER JOIN plan AS p ON v.cod_plan = p.cod_plan
INNER JOIN disciplina AS d ON p.cod_disciplina = d.cod_disciplina
INNER JOIN cliente AS c ON v.cod_cliente = c.cod_cliente
INNER JOIN tipo_membresia AS tm ON tm.cod_tipo_membresia = v.cod_tipo_membresia
WHERE
v.cod_estado = 1
)x 
where activo = 1
group by nom_disciplina
order by fecha_fin_plan desc



