<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'config.php';

//functia de a adauga in tabel comenzi
function insertOrders($conn) {
    $stmt = $conn->prepare("
        INSERT INTO comenzi (data_plasarii, nume_client, email_client, numar_produse)
        SELECT 
            o.order_date AS data_plasarii,
            o.customer_name AS nume_client,
            o.customer_email AS email_client,
            COUNT(oi.product_id) AS numar_produse
        FROM 
            orders o
        JOIN 
            order_items oi ON o.id = oi.order_id
        GROUP BY 
            o.id, o.order_date, o.customer_name, o.customer_email
    ");

    if ($stmt->execute()) {
        return json_encode(['message' => 'Comenzile au fost inserate cu succes.']);
    } else {
        return json_encode(['message' => 'A apărut o eroare la inserarea comenzilor.', 'error' => $stmt->error]);
    }

    $stmt->close();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
      echo insertOrders($conn);
} else {
    echo json_encode(['message' => 'Metodă de solicitare invalidă.']);
}

$conn->close();
?>
