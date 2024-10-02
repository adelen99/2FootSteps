<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");

include 'config.php'; 
$query = "
    SELECT 
        o.id AS order_id, 
        o.order_date, 
        o.customer_name, 
        o.customer_email, 
        SUM(oi.quantity) AS total_quantity 
    FROM 
        orders o 
    LEFT JOIN 
        order_items oi ON o.id = oi.order_id 
    GROUP BY 
        o.id 
    ORDER BY 
        total_quantity DESC 
    LIMIT 25
";


$result = $conn->query($query);
$orders = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }
}

echo json_encode($orders);
$conn->close();
?>
