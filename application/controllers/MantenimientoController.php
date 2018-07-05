<?php

/**
 * MantenimientoController
 * 
 * @author
 * @version 
 */

require_once 'Zend/Controller/Action.php';

class MantenimientoController extends Zend_Controller_Action {
	/**
	 * The default action - show the home page
	 */
	public function init() {
		$this->view->util()->registerScriptJSController($this->getRequest());
		$this->view->util()->verified_session();
	}
	public function indexAction() {
		// TODO Auto-generated MantenimientoController::indexAction() default action
	}
	
	public function disciplinasAction() {
		// TODO Auto-generated MantenimientoController::indexAction() default action
	}
	
	public function sedesAction() {
		// TODO Auto-generated MantenimientoController::indexAction() default action
	}
public function salasAction() {
		// TODO Auto-generated MantenimientoController::indexAction() default action
	}
	
public function clasesAction() {
		// TODO Auto-generated MantenimientoController::indexAction() default action
	}
	
public function personalAction() {
		// TODO Auto-generated MantenimientoController::indexAction() default action
	}

}

