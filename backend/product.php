<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once './config.php';
require_once './classes/Product.php';
require_once './classes/TaxableProduct.php'; 

// verificam daca exista parametrul 'id' in URL
if (isset($_GET['id']) && is_numeric($_GET['id'])) {
    $id = intval($_GET['id']); // convertim la integer pentru a preveni SQL injection

    $sql = "SELECT p.*, GROUP_CONCAT(c.name) AS categories
            FROM products p
            LEFT JOIN product_categories pc ON p.id = pc.product_id
            LEFT JOIN categories c ON pc.category_id = c.id
            WHERE p.id = $id
            GROUP BY p.id";

    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) { 
        $row = $result->fetch_assoc();
        $categories = explode(',', $row['categories']); // transformam categoriile într-un array
        
        // verificam daca produsul este cu TVA
        if ($row['is_taxable']) {
            // cream o instanta noua a clasei TaxableProduct
            $product = new TaxableProduct(
                $row['id'],
                $row['title'],
                $row['description'],
                $row['price'], 
                $row['is_taxable'],
                $categories,
                $row['img_url']
            );
            // obtinem pretul cu TVA 
            $priceWithTax = number_format($product->getPriceWithTax(), 2, '.', '');
        } else {
            // cream o instanta clasei
            $product = new Product(
                $row['id'],
                $row['title'],
                $row['description'],
                $row['price'], 
                $row['is_taxable'],
                $categories,
                $row['img_url'] 
            );
            
            $priceWithTax = number_format($product->price, 2, '.', '');
        }

        
        $response = [
            'id' => $product->id,
            'title' => $product->title,
            'description' => $product->description,
            'price' => $priceWithTax, //pret cu tva sau normal
            'categories' => $categories,
            'img_url' => $product->img_url 
        ];

        echo json_encode($response);
    } else {
        echo json_encode(["message" => "Produsul nu a fost găsit."]);
    }
} else {
    echo json_encode(["message" => "ID invalid."]);
}
?>
