<?php

/**
 * ClienteController
 * 
 * @author
 * @version 
 */

require_once 'Zend/Controller/Action.php';

class ClienteController extends Zend_Controller_Action {
	/**
	 * The default action - show the home page
	 */
	public function init() {
		$this->view->util()->registerScriptJSController($this->getRequest());
	}
	public function indexAction() {
		// TODO Auto-generated ClienteController::indexAction() default action
	}
	
	public function mantenimientoclienteAction() {
		// TODO Auto-generated ClienteController::indexAction() default action
	}

}

