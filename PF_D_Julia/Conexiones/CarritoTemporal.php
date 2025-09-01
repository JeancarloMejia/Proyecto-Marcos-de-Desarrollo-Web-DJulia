<?php
require_once '../config/conexion.php';

class CarritoModel {
    private $pdo;

    public function __construct() {
        $this->pdo = Conexion::conectar();
    }

    // Obtener todos los productos del carrito de un usuario
    public function obtenerPorUsuario($id_usuario) {
        $stmt = $this->pdo->prepare("SELECT c.*, p.nombre, p.precio, p.imagen_url 
            FROM carrito_temporal c 
            JOIN productos p ON c.id_producto = p.id_producto 
            WHERE c.id_usuario = ?");
        $stmt->execute([$id_usuario]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Agregar producto al carrito
    public function agregar($id_usuario, $id_producto, $cantidad) {
        $stmt = $this->pdo->prepare("INSERT INTO carrito_temporal (id_usuario, id_producto, cantidad) VALUES (?, ?, ?)");
        return $stmt->execute([$id_usuario, $id_producto, $cantidad]);
    }

    // Actualizar cantidad de un producto en el carrito
    public function actualizarCantidad($id_usuario, $id_producto, $cantidad) {
        $stmt = $this->pdo->prepare("UPDATE carrito_temporal SET cantidad = ? WHERE id_usuario = ? AND id_producto = ?");
        return $stmt->execute([$cantidad, $id_usuario, $id_producto]);
    }

    // Eliminar producto del carrito
    public function eliminar($id_usuario, $id_producto) {
        $stmt = $this->pdo->prepare("DELETE FROM carrito_temporal WHERE id_usuario = ? AND id_producto = ?");
        return $stmt->execute([$id_usuario, $id_producto]);
    }

    // Vaciar carrito completo
    public function vaciar($id_usuario) {
        $stmt = $this->pdo->prepare("DELETE FROM carrito_temporal WHERE id_usuario = ?");
        return $stmt->execute([$id_usuario]);
    }
}