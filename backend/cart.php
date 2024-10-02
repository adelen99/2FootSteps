<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

// conexiunea la baza de date
include 'config.php';

// functia pentru a adauga un produs in cos
function addToCart($conn, $product_id, $quantity, $price) {
    // verificam daca produsul exista deja in cos
    $stmt = $conn->prepare("SELECT id, quantity FROM cart WHERE product_id = ?");
    $stmt->bind_param("i", $product_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $existing_item = $result->fetch_assoc();

    if ($existing_item) {
        // daca produsul exista , actualizam cantitatea
        $new_quantity = $existing_item['quantity'] + $quantity;
        $stmt = $conn->prepare("UPDATE cart SET quantity = ? WHERE id = ?");
        $stmt->bind_param("ii", $new_quantity, $existing_item['id']);
    } else {
        // daca nu exista, il adaugam
        $stmt = $conn->prepare("INSERT INTO cart (product_id, quantity, price) VALUES (?, ?, ?)");
        $stmt->bind_param("iii", $product_id, $quantity, $price);
    }
    
    if ($stmt->execute()) {
        return json_encode(['success' => true, 'message' => 'Product added/updated in cart successfully']);
    } else {
        return json_encode(['success' => false, 'message' => 'Failed to add/update product in cart']);
    }
}

// functia pt a obtine produsele din cos
function getCartItems($conn) {
    $sql = "SELECT 
                c.id AS cart_id,
                c.order_id,
                p.title AS product_name,
                p.img_url,
                c.quantity,
                c.price,
                (c.price * c.quantity) AS total
            FROM 
                cart c
            JOIN 
                products p ON c.product_id = p.id";
    
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $cartItems = array();
        while ($row = $result->fetch_assoc()) {
            $cartItems[] = $row;
        }
        return json_encode(['items' => $cartItems, 'cartTotal' => array_sum(array_column($cartItems, 'total'))]);
    } else {
        return json_encode(['items' => [], 'cartTotal' => 0]);
    }
}

// Funcția pentru a șterge un produs din coș
function deleteCartItem($conn, $cart_id) {
    $stmt = $conn->prepare("DELETE FROM cart WHERE id = ?");
    $stmt->bind_param("i", $cart_id);
    
    if ($stmt->execute()) {
        return json_encode(['message' => 'Product removed from cart successfully']);
    } else {
        return json_encode(['message' => 'Failed to remove product from cart']);
    }
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    //obtinem datele din cerere
    $data = json_decode(file_get_contents("php://input"), true);
    
    //verificam daca sunt date valide pentru adaugare
    if (isset($data['product_id'], $data['quantity'], $data['price'])) {
        $product_id = $data['product_id'];
        $quantity = $data['quantity'];
        $price = $data['price'];
        echo addToCart($conn, $product_id, $quantity, $price);
    } elseif (isset($data['cart_id'])) { // Ștergere produs din coș
        $cart_id = $data['cart_id'];
        echo deleteCartItem($conn, $cart_id);
    } else {
        echo json_encode(['message' => 'Invalid input']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    //returnam produsele din cos
    echo getCartItems($conn);
}

$conn->close();
?>
