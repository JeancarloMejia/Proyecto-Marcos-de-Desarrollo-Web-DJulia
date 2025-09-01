<?php
session_start();
require_once '../_ConexionMySQL/conexion.php'; 

$conexion = Conexion::conectar();

$correo = trim($_POST['correo'] ?? '');
$password = trim($_POST['password'] ?? '');

if ($correo && $password) {
    try {
        $stmt = $conexion->prepare("SELECT id, nombre, correo, password, rol FROM dbusuarios WHERE correo = ?");
        $stmt->execute([$correo]);
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($usuario) {
            if (password_verify($password, $usuario['password'])) {
                $_SESSION['usuario'] = $usuario['nombre'];
                $_SESSION['id'] = $usuario['id'];
                $_SESSION['rol'] = $usuario['rol'];

                if ($usuario['rol'] === 'admin' || $usuario['rol'] === 'Cliente') {
                    header("Location: ../Public/_Index.html");
                    exit();
                } else {
                    echo "⚠️ Rol no reconocido.";
                }
            } else {
                echo "⚠️ Contraseña incorrecta.";
            }
        } else {
            echo "⚠️ Correo no registrado.";
        }

    } catch (PDOException $e) {
        echo "❌ Error en la base de datos: " . $e->getMessage();
    }
} else {
    echo "⚠️ Por favor, completa todos los campos.";
}
?>
