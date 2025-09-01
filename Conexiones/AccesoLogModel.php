<?php
require_once __DIR__ . '/../config/conexion.php';

class AccesoLogModel {
    private $pdo;

    public function __construct() {
        $this->pdo = Conexion::conectar();
    }

    public function registrarAcceso($id_usuario, $ip) {
        $stmt = $this->pdo->prepare("INSERT INTO logs_acceso (id_usuario, fecha, direccion_ip) VALUES (?, NOW(), ?)");
        return $stmt->execute([$id_usuario, $ip]);
    }

    public function obtenerLogs($id_usuario) {
        $stmt = $this->pdo->prepare("SELECT * FROM logs_acceso WHERE id_usuario = ? ORDER BY fecha DESC");
        $stmt->execute([$id_usuario]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    //$logModel = new AccesoLogModel();
    //$logModel->registrarAcceso($usuario['id_usuario'], $_SERVER['REMOTE_ADDR']);
}