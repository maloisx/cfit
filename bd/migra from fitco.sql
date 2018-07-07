##############################################################################################################################
#delet clientes
delete from cliente;
##############################################################################################################################
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
SELECT
@rownum:=@rownum+1 AS rownum ,
c.cod_cliente,
#fvm.nombre,
#fvm.apellido,
#fvm.dni,
p.cod_plan,
#fvm.plan,
tm.cod_tipo_membresia,
#fvm.tipo_membresia,
fvm.fecha_ini_plan,
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
,(SELECT @rownum:=0 ) r

