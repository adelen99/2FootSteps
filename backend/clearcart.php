<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once './config.php';

//verificam conexiunea
if ($conn->connect_error) {
    http_response_code(500); 
    echo json_encode(["error" => "Conexiune eșuată: " . $conn->connect_error]);
    exit; 
}


$sql = "DELETE FROM cart"; // sterge tot din tabelul cosului

if ($conn->query($sql) === TRUE) {
    echo json_encode(["message" => "Coșul a fost șters cu succes."]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Eroare la ștergerea coșului: " . $conn->error]);
}

$conn->close();
?>
