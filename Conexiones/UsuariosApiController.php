<?php
require_once __DIR__ . '/UsuariosController.php';

class UsuariosApiController {
    private $controller;

    public function __construct() {
        $this->controller = new UsuariosController();
    }

    public function registrarUsuario($data) {
        return $this->controller->registrar($data);
    }

    public function loginUsuario($data) {
        $correo = $data['correo'] ?? '';
        $contraseña = $data['contraseña'] ?? '';
        return $this->controller->login($correo, $contraseña);
    }

    public function logout() {
        return $this->controller->logout();
    }

    public function obtenerUsuarioActual() {
        return $this->controller->obtenerUsuarioActual();
    }
}