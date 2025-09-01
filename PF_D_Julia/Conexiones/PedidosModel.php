<?php
require_once '../config/conexion.php';

class PedidosModel {
    private $pdo;

    public function __construct() {
        $this->pdo = Conexion::conectar();
    }

    // Obtener todos los pedidos 
    public function obtenerTodos() {
        $sql = "SELECT p.*, u.nombre AS nombre_cliente
                FROM pedidos p
                JOIN usuarios u ON p.id_usuario = u.id_usuario
                ORDER BY p.fecha_pedido DESC";
        return $this->pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    }

    // Agregar nuevo pedido
    public function agregar($id_usuario, $total, $direccion_entrega, $notas) {
        $stmt = $this->pdo->prepare("INSERT INTO pedidos (id_usuario, total, direccion_entrega, notas) VALUES (?, ?, ?, ?)");
        return $stmt->execute([$id_usuario, $total, $direccion_entrega, $notas]);
    }

    // Obtener pedido por ID
    public function obtenerPorId($id_pedido) {
        $stmt = $this->pdo->prepare("SELECT * FROM pedidos WHERE id_pedido = ?");
        $stmt->execute([$id_pedido]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Editar pedido
    public function editar($id_pedido, $estado, $direccion_entrega, $notas) {
        $stmt = $this->pdo->prepare("UPDATE pedidos 
                                    SET estado = ?, direccion_entrega = ?, notas = ?
                                    WHERE id_pedido = ?");
        return $stmt->execute([$id_pedido, $estado, $direccion_entrega, $notas, $id_pedido]);
    }

    // Eliminar pedido
    public function eliminar($id_pedido) {
        $stmt = $this->pdo->prepare("DELETE FROM pedidos WHERE id_pedido = ?");
        return $stmt->execute([$id_producto]);
    }
}