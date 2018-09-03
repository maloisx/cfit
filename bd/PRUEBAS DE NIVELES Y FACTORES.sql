#nivel 1
SELECT
pf.nivel , s.cod_socio , trim(concat(s.nombre , ' ' , s.appat , ' ' , s.apmat )) AS socio  , sum((v.precio*pf.factor/100) * v.cantidad) monto
FROM
socio AS s , venta as v , producto_factor as pf
where s.cod_socio_ref = 1
and s.cod_socio = v.cod_socio
and pf.cod_producto = v.cod_producto
and pf.nivel = 1
group by pf.nivel , s.cod_socio , concat(s.nombre , ' ' , s.appat , ' ' , s.apmat ) ;

#nivel 2
SELECT
pf.nivel , s.cod_socio , trim(concat(s.nombre , ' ' , s.appat , ' ' , s.apmat )) AS socio  , sum((v.precio*pf.factor/100) * v.cantidad) monto
FROM
socio AS s , venta as v , producto_factor as pf
where s.cod_socio_ref in (select cod_socio from socio where cod_socio_ref = 1)
and s.cod_socio = v.cod_socio
and pf.cod_producto = v.cod_producto
and pf.nivel = 2
group by pf.nivel , s.cod_socio , concat(s.nombre , ' ' , s.appat , ' ' , s.apmat ) ;

#nivel 3
SELECT
pf.nivel , s.cod_socio , trim(concat(s.nombre , ' ' , s.appat , ' ' , s.apmat )) AS socio  , sum((v.precio*pf.factor/100) * v.cantidad) monto
FROM
socio AS s , venta as v , producto_factor as pf
where s.cod_socio_ref in (select cod_socio from socio where cod_socio_ref in (select cod_socio from socio where cod_socio_ref = 1))
and s.cod_socio = v.cod_socio
and pf.cod_producto = v.cod_producto
and pf.nivel = 3
group by pf.nivel , s.cod_socio , concat(s.nombre , ' ' , s.appat , ' ' , s.apmat ) ;

#nivel 4
SELECT
pf.nivel , s.cod_socio , trim(concat(s.nombre , ' ' , s.appat , ' ' , s.apmat )) AS socio  , sum((v.precio*pf.factor/100) * v.cantidad) monto
FROM
socio AS s , venta as v , producto_factor as pf
where s.cod_socio_ref in (SELECT cod_socio FROM socio AS s  where s.cod_socio_ref in (select cod_socio from socio where cod_socio_ref in (select cod_socio from socio where cod_socio_ref = 1)))
and s.cod_socio = v.cod_socio
and pf.cod_producto = v.cod_producto
and pf.nivel = 4
group by pf.nivel , s.cod_socio , concat(s.nombre , ' ' , s.appat , ' ' , s.apmat ) ;


#nivel 5
SELECT
pf.nivel , s.cod_socio , trim(concat(s.nombre , ' ' , s.appat , ' ' , s.apmat )) AS socio  , sum((v.precio*pf.factor/100) * v.cantidad) monto
FROM
socio AS s , venta as v , producto_factor as pf
where s.cod_socio_ref in (SELECT cod_socio FROM socio AS s  where s.cod_socio_ref in (SELECT cod_socio FROM socio AS s  where s.cod_socio_ref in (select cod_socio from socio where cod_socio_ref in (select cod_socio from socio where cod_socio_ref = 1))))
and s.cod_socio = v.cod_socio
and pf.cod_producto = v.cod_producto
and pf.nivel = 5
group by pf.nivel , s.cod_socio , concat(s.nombre , ' ' , s.appat , ' ' , s.apmat ) ;
