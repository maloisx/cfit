<?php

class IndexController extends Zend_Controller_Action {

	public function init() {
		$this->view->util ()->registerScriptJSController ( $this->getRequest () );
		//$this->view->util ()->verified_session ();		
	}

	public function indexAction() {
		$url = $this->view->util()->getPath();
		$ddatosuserlog = new Zend_Session_Namespace('datosuserlog');
		$codemp = $ddatosuserlog->codemp;
		$nompers = $ddatosuserlog->nombre . ' '. $ddatosuserlog->apepat . ' ' . $ddatosuserlog->apemat;

		if($codemp == '' || $codemp == null){
			$this->_redirect($url.'index.php/logeo/');
		}//else{
			//$this->_redirect($url.'index.php/index/dashboard');
		//}
//		echo 'proyecto limpio<br><br>';
		
//		$nombrestore = 'prueba.sp_prueba';
//		$arraydatos[]= 'xxx';
//
//		$cn = new Model_DataAdapter();
//		$datos = $cn->ejec_store_procedura_postgres($nombrestore,$arraydatos);
//		
//		print_r($datos);
		
	}
	
	public function enmantenimientoAction() {
		
	}
	
	public function redirectAction() {
		
		$this->_helper->viewRenderer->setNoRender(); 
		$this->_helper->layout->disableLayout();
		
		$url = $this->_request->getParam('url','');
		
		$this->_redirect($url);
				
	}
	
	public function dashboardAction() {
		
	}
	
}