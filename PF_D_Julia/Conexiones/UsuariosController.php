<?php
require_once __DIR__ . '/../model/UsuarioModel.php';
require_once __DIR__ . '/../model/AccesoLogModel.php';

class UsuariosController {
    private $model;
    private $logModel;

    public function __construct() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        $this->model = new UsuarioModel();
        $this->logModel = new AccesoLogModel();
    }
    //Registro Usuario (Cliente)
    public function registrar($data) {
        $correo = $data['correo'];
        // Validar si ya existe
        if ($this->model->obtenerPorCorreo($correo)) {
            return ['success' => false, 'message' => 'El correo ya está registrado'];
        }

        $data['contraseña'] = password_hash($data['contraseña'], PASSWORD_DEFAULT);
        $exito = $this->model->agregar(
            $data['nombre'],
            $data['correo'],
            $data['contraseña'],
            $data['telefono'],
            $data['direccion'],
            'cliente'
        );

        return ['success' => $exito];
    }
    //Login de Usuario (Cliente o Admin)
    public function login($correo, $contraseña) {
        $usuario = $this->model->obtenerPorCorreo($correo);

        if (!$usuario) {
            return ['success' => false, 'message' => 'El correo no está registrado'];
        }

        if (!password_verify($contraseña, $usuario['contraseña'])) {
            return ['success' => false, 'message' => 'Contraseña incorrecta'];
        }

        // Guardar datos de sesión
        $_SESSION['usuario'] = [
            'id_usuario' => $usuario['id_usuario'],
            'nombre' => $usuario['nombre'],
            'correo' => $usuario['correo'],
            'rol' => $usuario['rol']
        ];

        // Registrar acceso en logs
        $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'desconocido';
        $ip = $_SERVER['REMOTE_ADDR'];
        $this->logModel->registrarAcceso($usuario['id_usuario'], $ip, $userAgent);

        // Retornar con rol y ruta sugerida
        return [
                'success' => true,
                'rol' => $usuario['rol'],
                'redirect' => ($usuario['rol'] === 'admin') ? '/PF_D_Julia/public/Cliente/Iconos/rol.html' : '/PF_D_Julia/public/Cliente/prueba.html'
        ];
    }
    //Cerrar Sesión
    public function logout() {
        session_unset();
        session_destroy();
        return ['success' => true];
    }
    //Usuario en sesión
    public function obtenerUsuarioActual() {
        return $_SESSION['usuario'] ?? null;
    }
}