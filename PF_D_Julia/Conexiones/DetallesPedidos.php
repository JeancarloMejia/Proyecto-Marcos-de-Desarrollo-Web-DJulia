<?php
require_once '../config/conexion.php';

class DetallePedidosModel {
    private $pdo;

    public function __construct() {
        $this->pdo = Conexion::conectar();
    }

    // Obtener todos los detalles de pedidos
    public function obtenerTodos() {
        $sql = "SELECT d.*, p.nombre AS nombre_producto 
                FROM detalle_pedidos d
                JOIN productos p ON d.id_producto = p.id_producto
                ORDER BY d.id_detalle DESC";
        return $this->pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    }

    // Obtener detalles por ID de un pedido
    public function obtenerPorPedido($id_pedido) {
        $stmt = $this->pdo->prepare("SELECT d.*, p.nombre AS nombre_producto 
                                    FROM detalle_pedidos d 
                                    JOIN productos p ON d.id_producto = p.id_producto 
                                    WHERE d.id_pedido = ?");
        $stmt->execute([$id_pedido]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Agregar un nuevo detalle de pedido
    public function agregar($id_pedido, $id_producto, $cantidad, $subtotal) {
        $stmt = $this->pdo->prepare("INSERT INTO detalle_pedidos (id_pedido, id_producto, cantidad, subtotal) VALUES (?, ?, ?, ?)");
        return $stmt->execute([$id_pedido, $id_producto, $cantidad, $subtotal]);
    }

    // Editar detalle de pedido
    public function editar($id_detalle, $cantidad, $subtotal) {
        $stmt = $this->pdo->prepare("UPDATE detalle_pedidos 
                                    SET cantidad = ?, subtotal = ? 
                                    WHERE id_detalle = ?");
        return $stmt->execute([$cantidad, $subtotal, $id_detalle]);
    }

    // Eliminar un detalle específico de un pedido
    public function eliminar($id_detalle) {
        $stmt = $this->pdo->prepare("DELETE FROM detalle_pedidos WHERE id_detalle = ?");
        return $stmt->execute([$id_detalle]);
    }

    // Eliminar todos los detalles que tiene un pedido
    public function eliminarPorPedido($id_pedido) {
        $stmt = $this->pdo->prepare("DELETE FROM detalle_pedidos WHERE id_pedido = ?");
        return $stmt->execute([$id_pedido]);
    }
}