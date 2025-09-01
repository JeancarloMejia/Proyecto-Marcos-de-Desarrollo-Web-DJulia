<?php
require_once __DIR__ . '/../config/conexion.php';

class UsuarioModel {
    private $pdo;

    public function __construct() {
        $this->pdo = Conexion::conectar();
    }

    // Obtener todos los usuarios
    public function obtenerTodos() {
        $sql = "SELECT * FROM usuarios";
        return $this->pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    }

    // Agregar nuevo usuario
    public function agregar($nombre, $correo, $contraseña, $telefono, $direccion, $rol = 'cliente') {
        $stmt = $this->pdo->prepare("INSERT INTO usuarios (nombre, correo, contraseña, telefono, direccion, rol) VALUES (?, ?, ?, ?, ?, ?)");
        return $stmt->execute([$nombre, $correo, $contraseña, $telefono, $direccion, $rol]);
    }

    // Obtener usuario por ID
    public function obtenerPorId($id) {
        $stmt = $this->pdo->prepare("SELECT * FROM usuarios WHERE id_usuario = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Editar usuario
    public function editar($id, $nombre, $correo, $telefono, $direccion, $rol) {
        $stmt = $this->pdo->prepare("UPDATE usuarios 
                                    SET nombre = ?, correo = ?, telefono = ?, direccion = ?, rol = ? 
                                    WHERE id_usuario = ?");
        return $stmt->execute([$nombre, $correo, $telefono, $direccion, $rol, $id]);
    }

    // Eliminar usuario
    public function eliminar($id) {
        $stmt = $this->pdo->prepare("DELETE FROM usuarios WHERE id_usuario = ?");
        return $stmt->execute([$id]);
    }

    //Obtener usuario por Correo
    public function obtenerPorCorreo($correo) {
        $sql = "SELECT * FROM usuarios WHERE correo = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$correo]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}