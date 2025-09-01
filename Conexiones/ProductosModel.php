<?php
require_once '../config/conexion.php';

class ProductosModel {
    private $pdo;

    public function __construct() {
        $this->pdo = Conexion::conectar();
    }

    // Obtener todos los productos con categoría    
    public function obtenerTodos() {
        $sql = "SELECT p.*, c.nombre AS categoria 
        FROM productos p 
        JOIN categorias c ON p.id_categoria = c.id_categoria";
        return $this->pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    }

    // Agregar nuevo producto
    public function agregar($nombre, $descripcion, $precio, $imagen_url, $stock, $id_categoria) {
        $stmt = $this->pdo->prepare("INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, id_categoria) VALUES (?, ?, ?, ?, ?, ?)");
        return $stmt->execute([$nombre, $descripcion, $precio, $imagen_url, $stock, $id_categoria]);
    }

    // Obtener producto por ID
    public function obtenerPorId($id_producto) {
        $stmt = $this->pdo->prepare("SELECT * FROM productos WHERE id_producto = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Editar producto
    public function editar($id_producto, $nombre, $descripcion, $precio, $imagen_url, $stock, $id_categoria) {
        $stmt = $this->pdo->prepare("UPDATE productos 
                                    SET nombre = ?, descripcion = ?, precio = ?, imagen_url = ?, stock = ?, id_categoria = ? 
                                    WHERE id_producto = ?");
        return $stmt->execute([$nombre, $descripcion, $precio, $imagen_url, $stock, $id_categoria, $id_producto]);
    }

    // Eliminar producto
    public function eliminar($id_producto) {
        $stmt = $this->pdo->prepare("DELETE FROM productos WHERE id_producto = ?");
        return $stmt->execute([$id_producto]);
    }

    // Actualizar stock
    public function actualizarStock($id_producto, $nuevoStock) {
        $stmt = $this->pdo->prepare("UPDATE productos SET stock = ? WHERE id_producto = ?");
        return $stmt->execute([$nuevoStock, $id_producto]);
    }
}