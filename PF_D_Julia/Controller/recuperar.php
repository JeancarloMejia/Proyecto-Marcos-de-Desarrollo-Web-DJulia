<?php
require_once __DIR__ . '/../_ConexionMySQL/conexion.php'; 
$conexion = Conexion::conectar();

$correo = trim($_POST['correo'] ?? '');
$nueva_contrasenia = trim($_POST['nueva_contrasenia'] ?? '');

$mensaje = "";
$redirigir = false;

if ($correo && $nueva_contrasenia) {
    try {
        $stmt = $conexion->prepare("SELECT id FROM dbusuarios WHERE correo = ?");
        $stmt->execute([$correo]);
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($usuario) {
            $hash_contrasenia = password_hash($nueva_contrasenia, PASSWORD_DEFAULT);
            $update = $conexion->prepare("UPDATE dbusuarios SET password = ? WHERE correo = ?");
            $resultado = $update->execute([$hash_contrasenia, $correo]);

            if ($resultado) {
                $mensaje = "✅ Contraseña actualizada correctamente.";
                $redirigir = true;
            } else {
                $mensaje = "❌ No se pudo actualizar la contraseña.";
            }
        } else {
            $mensaje = "⚠️ El correo ingresado no existe.";
        }
    } catch (PDOException $e) {
        $mensaje = "❌ Error: " . $e->getMessage();
    }
} else {
    $mensaje = "⚠️ Completa todos los campos.";
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Recuperación</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * { box-sizing: border-box; }

        body {
            margin: 0;
            padding: 0;
            background-image: url(../Public/Imagenes/blur.png);
            background-size: cover;
            background-position: center;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-family: 'Segoe UI', sans-serif;
        }

        .modal {
            background: rgba(22, 8, 59, 0.95);
            padding: 30px 40px;
            border-radius: 15px;
            text-align: center;
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
            max-width: 350px;
            width: 90%;
            animation: fadeIn 0.4s ease-in-out;
            backdrop-filter: blur(8px);
        }

        .modal p {
            font-size: 18px;
            margin-bottom: 25px;
            color: white;
        }

        .modal button {
            padding: 10px 25px;
            background: white;
            color: black;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            transition: background 0.3s;
        }

        .modal button:hover {
            background: #ddd;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
    </style>
</head>
<body>
    <div class="modal">
        <p><?= htmlspecialchars($mensaje) ?></p>
        <button onclick="cerrarModal()">Aceptar</button>
    </div>

    <script>
        function cerrarModal() {
            <?php if ($redirigir): ?>
                window.location.href = '../Public/loggin.html';
            <?php else: ?>
                window.history.back();
            <?php endif; ?>
        }
    </script>
</body>
</html>
