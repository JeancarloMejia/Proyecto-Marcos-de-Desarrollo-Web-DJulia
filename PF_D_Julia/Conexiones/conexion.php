<?php
class Conexion {
    public static function conectar() {
        return new PDO("mysql:host=localhost;dbname=pasteleria_db;charset=utf8mb4", "root", "");
    }
}