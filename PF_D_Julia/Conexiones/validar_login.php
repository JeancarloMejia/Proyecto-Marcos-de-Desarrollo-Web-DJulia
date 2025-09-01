<?php
require_once __DIR__ . '/../../controller/UsuariosController.php';

header('Content-Type: application/json');

// Obtener datos del JSON
$data = json_decode(file_get_contents('php://input'), true);

// Guardar en debug.txt los datos recibidos
file_put_contents('login.txt', print_r($data, true));

if (!$data || !isset($data['usuario']) || !isset($data['contrasena'])) {
    echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
    exit;
}

$correo = $data['usuario'];
$contraseña = $data['contrasena'];

$controller = new UsuariosController();
$resultado = $controller->login($correo, $contraseña);  

echo json_encode($resultado);

