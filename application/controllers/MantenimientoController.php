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
	}
	public function indexAction() {
		// TODO Auto-generated MantenimientoController::indexAction() default action
	}
	
	public function disciplinasAction() {
		// TODO Auto-generated MantenimientoController::indexAction() default action
	}

}

