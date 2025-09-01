<?php
require_once '../config/conexion.php';

class CategoriasModel {
    private $pdo;

    public function __construct() {
        $this->pdo = Conexion::conectar();
    }

    // Obtener todas las categorías
    public function obtenerTodas() {
        $sql = "SELECT * FROM categorias";
        return $this->pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    }

    // Agregar una nueva categoría
    public function agregar($nombre) {
        $stmt = $this->pdo->prepare("INSERT INTO categorias (nombre) VALUES (?)");
        return $stmt->execute([$nombre]);
    }

    // Editar una categoría
    public function editar($id_categoria, $nombre) {
        $stmt = $this->pdo->prepare("UPDATE categorias SET nombre = ? WHERE id_categoria = ?");
        return $stmt->execute([$nombre, $id_categoria]);
    }

    // Eliminar una categoría
    public function eliminar($id_categoria) {
        $stmt = $this->pdo->prepare("DELETE FROM categorias WHERE id_categoria = ?");
        return $stmt->execute([$id_categoria]);
    }
}