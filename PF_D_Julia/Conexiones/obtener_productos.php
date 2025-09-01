<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Conexión desde config
require_once('../../../config/conexion.php');

$productos = [];

try {
    // Conectar a la base de datos
    $conexion = Conexion::conectar();

    // Preparar y ejecutar el procedimiento almacenado
    $stmt = $conexion->prepare("CALL sp_obtener_productos()");
    $stmt->execute();

    // Obtener todos los resultados como array asociativo
    $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Procesar resultados
    foreach ($resultado as $fila) {
        $img = isset($fila['imagen_url']) ? $fila['imagen_url'] : (isset($fila['image']) ? $fila['image'] : '');
        $cat = isset($fila['categoria']) ? $fila['categoria'] : (isset($fila['category']) ? $fila['category'] : '');
        $imgPath = (strpos($img, 'uploads/') === 0) ? "../DetallesProductos/" . $img : "../imagenes/" . $img;

        $productos[] = [
            "id" => $fila['id'],
            "name" => $fila['name'],
            "price" => "S/" . number_format($fila['price'], 2),
            "category" => $cat,
            "image" => $imgPath
        ];
    }

    echo json_encode($productos);

} catch (PDOException $e) {
    echo json_encode(["error" => "Error de conexión o consulta: " . $e->getMessage()]);
}
?>


