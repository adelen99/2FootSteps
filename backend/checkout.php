<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
include 'config.php';

//funcita pt a plasa o comanda
function placeOrder($conn, $customer_name, $customer_email, $customer_phone, $customer_address, $totalAmount) {
    $stmt = $conn->prepare("INSERT INTO orders (customer_name, customer_email, customer_phone, customer_address, total_amount, order_date) VALUES (?, ?, ?, ?, ?, NOW())");
    $stmt->bind_param("ssssd", $customer_name, $customer_email, $customer_phone, $customer_address, $totalAmount);

    if ($stmt->execute()) {
        return json_encode(['message' => 'Comanda a fost plasată cu succes!']);
    } else {
        return json_encode(['message' => 'A apărut o eroare la plasarea comenzii.', 'error' => $stmt->error]);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (isset($data['name'], $data['email'], $data['phone'], $data['address'], $data['total_amount'])) {
        echo placeOrder($conn, $data['name'], $data['email'], $data['phone'], $data['address'], $data['total_amount']);
    } else {
        echo json_encode(['message' => 'Input invalid.']);
    }
} else {
    echo json_encode(['message' => 'Metodă de solicitare invalidă.']);
}

$conn->close();
?>
