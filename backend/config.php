<?php
$servername = 'localhost';
$username = 'root';
$password = "";
$dbname = 'shopdb';

$conn = new mysqli($servername,$username,$password,$dbname);

if($conn->connect_error) {
    die("Conexiunea a esuat" . $conn->connect_error);
}?>