<?php
//require_once dirname(__FILE__).'/../../library/Log4PHP/Logger.php';

class Model_DataAdapter {
	    
	public function ejec_store_procedura_mysql($nombrestore,$arraydatos = null)
	{		
		$conexion = mysql_connect("localhost", "root", "root");
		mysql_select_db("tree", $conexion);
		mysql_query("SET NAMES 'utf8'");
		
		$caddatos = ' ( ';
			if($arraydatos != '' || $arraydatos != null){
				if(count($arraydatos) > 0){
					for($i=0;$i<count($arraydatos);$i++){
						$valvar = $arraydatos[$i];
						//$valvar = mysql_real_escape_string ($valvar,$conexion);
						$caddatos.= "'".$valvar."',";
					}
					$caddatos = substr($caddatos,0,strlen($caddatos)-1);
				}
			}
    		$caddatos .= ' )';
    	
		$que = "call ".$nombrestore.$caddatos;
		//echo '<textarea>'.$que.'</textarea>';

		$res = mysql_query($que, $conexion) or die(mysql_error());
		
			$tot = mysql_num_rows($res);			
	
		       $conta = 0;
		       $array = null;
			   //while($row = mysql_fetch_object($res)) {
				while($row = mysql_fetch_array($res, MYSQL_BOTH)) {   
			      $array[] = $row;
			    }
			mysql_close($conexion);
			return $array;
		
	}
	
}