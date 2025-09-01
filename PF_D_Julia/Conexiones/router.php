<?php
require_once '../Controller/UsuariosApiController.php';
require_once '../Controller/CarritoController.php';
header('Content-Type: application/json');

$controller = new UsuariosApiController();
$carritoController = new CarritoController();

// Esto simula una API REST sencilla
$accion = $_GET['action'] ?? '';

switch ($accion) {
    case 'login':
        // Recibes JSON de JS
        $json = json_decode(file_get_contents('php://input'), true);
        echo json_encode($controller->loginUsuario($json));
        break;

    case 'registrar':
        $json = json_decode(file_get_contents('php://input'), true);
        echo json_encode($controller->registrarUsuario($json));
        break;

    case 'logout':
        echo json_encode($controller->logout());
        break;

    case 'usuarioActual':
        echo json_encode($controller->obtenerUsuarioActual());
        break;

    case 'obtenerCarrito':
        echo json_encode($carritoController->obtener());
        break;

    case 'agregarCarrito':
        $json = json_decode(file_get_contents('php://input'), true);
        echo json_encode($carritoController->agregar($json));
        break;

    case 'actualizarCarrito':
        $json = json_decode(file_get_contents('php://input'), true);
        echo json_encode($carritoController->actualizarCantidad($json));
        break;

    case 'eliminarCarrito':
        $json = json_decode(file_get_contents('php://input'), true);
        echo json_encode($carritoController->eliminar($json));
        break;

    case 'vaciarCarrito':
        echo json_encode($carritoController->vaciar());
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Acción no válida']);
} 