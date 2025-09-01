<?php
require_once __DIR__ . '/../model/CarritoTemporal.php';

class CarritoController {
    public static function obtener() {
        $id_usuario = $_SESSION['usuario']['id_usuario'] ?? null;
        if (!$id_usuario) {
            echo json_encode([]);
            return;
        }

        $model = new CarritoModel();
        $carrito = $model->obtenerPorUsuario($id_usuario);
        echo json_encode($carrito);
    }

    public static function agregar() {
        $id_usuario = $_SESSION['usuario']['id_usuario'] ?? null;
        $data = json_decode(file_get_contents("php://input"), true);

        header('Content-Type: application/json');

        if ($id_usuario && isset($data['id_producto'], $data['cantidad'])) {
            $model = new CarritoModel();
            $model->agregar($id_usuario, $data['id_producto'], $data['cantidad']);
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, error => 'Datos incompletos']);
        }
    }

    public static function actualizar() {
        $id_usuario = $_SESSION['usuario']['id_usuario'] ?? null;
        $data = json_decode(file_get_contents("php://input"), true);
        if ($id_usuario && isset($data['id_producto'], $data['cantidad'])) {
            $model = new CarritoModel();
            $model->actualizarCantidad($id_usuario, $data['id_producto'], $data['cantidad']);
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false]);
        }
    }

    public static function eliminar() {
        $id_usuario = $_SESSION['usuario']['id_usuario'] ?? null;
        $data = json_decode(file_get_contents("php://input"), true);
        if ($id_usuario && isset($data['id_producto'])) {
            $model = new CarritoModel();
            $model->eliminar($id_usuario, $data['id_producto']);
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false]);
        }
    }

    public static function vaciar() {
        $id_usuario = $_SESSION['usuario']['id_usuario'] ?? null;
        if ($id_usuario) {
            $model = new CarritoModel();
            $model->vaciar($id_usuario);
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false]);
        }
    }
}