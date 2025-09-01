<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Conexión a la base de datos
$conn = new mysqli("localhost", "root", "", "pasteleria_db");
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Recibe los datos del formulario
$nombre = $_POST['nombre'];
$descripcion = $_POST['descripcion'];
$categoria_nombre = $_POST['categoria'];
$precio = $_POST['precio'];

// Buscar el id_categoria por nombre
$id_categoria = null;
if (!empty($categoria_nombre)) {
    $cat_stmt = $conn->prepare("SELECT id_categoria FROM categorias WHERE nombre = ?");
    $cat_stmt->bind_param("s", $categoria_nombre);
    $cat_stmt->execute();
    $cat_stmt->bind_result($id_categoria);
    $cat_stmt->fetch();
    $cat_stmt->close();

    // Si no existe la categoría, la creamos
    if (!$id_categoria) {
        $cat_insert = $conn->prepare("INSERT INTO categorias (nombre) VALUES (?)");
        $cat_insert->bind_param("s", $categoria_nombre);
        $cat_insert->execute();
        $id_categoria = $cat_insert->insert_id;
        $cat_insert->close();
    }
}

// Manejo de imagen
$imagen_url = "";
if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] == 0) {
    $imgName = uniqid() . "_" . basename($_FILES['imagen']['name']);
    $uploadDir = "uploads/";
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }
    move_uploaded_file($_FILES['imagen']['tmp_name'], $uploadDir . $imgName);
    $imagen_url = $uploadDir . $imgName;
}

// Inserta en la base de datos
$sql = "INSERT INTO productos (id_categoria, nombre, descripcion, precio, imagen_url, stock) VALUES (?, ?, ?, ?, ?, 0)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("issds", $id_categoria, $nombre, $descripcion, $precio, $imagen_url);

if ($stmt->execute()) {
    echo "ok";
} else {
    echo "error: " . $stmt->error;
}
$stmt->close();
$conn->close();
?>