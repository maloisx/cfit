select socio_n1 , socio_n2 , socio_n3, socio_n4 , sssss.cod_socio_ref as socio_n5  FROM
(select socio_n1 , socio_n2 , socio_n3 , ssss.cod_socio_ref as socio_n4  FROM
(select socio_n1 , socio_n2 , sss.cod_socio_ref as socio_n3  FROM
(select socio_n1 , ss.cod_socio_ref as socio_n2 FROM
(SELECT s.cod_socio_ref as socio_n1
FROM persona AS s WHERE s.cod_persona = 17
) n1 LEFT JOIN persona ss on ss.cod_persona = socio_n1
) n2 left JOIN persona sss on sss.cod_persona = socio_n2
) n3 left JOIN persona ssss on ssss.cod_persona = socio_n3
) n4 left JOIN persona sssss on sssss.cod_persona = socio_n4