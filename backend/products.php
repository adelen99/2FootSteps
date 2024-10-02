<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once './config.php';
require_once './classes/Product.php';
require_once './classes/TaxableProduct.php'; 

// interogam baza de date pt products
$sql = "SELECT p.*, GROUP_CONCAT(c.name) AS categories
        FROM products p
        LEFT JOIN product_categories pc ON p.id = pc.product_id
        LEFT JOIN categories c ON pc.category_id = c.id
        GROUP BY p.id";


$result = $conn->query($sql);

$products = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $categories = explode(',', $row['categories']);
        
       
        $price = (float)$row['price']; //convertim pretul la float
        
        // verificam dacă produsul este cu TVA
        if ($row['is_taxable']) {
            //cream un obiect taxableProduct
            $product = new TaxableProduct(
                $row['id'],
                $row['title'],
                $row['description'],
                $price,
                $row['is_taxable'],
                $categories,
                $row['img_url']
            );
            // adaugam pretul cu TVA în array-ul produselor
            $products[] = [
                'id' => $product->id,
                'title' => $product->title,
                'description' => $product->description,
                'price' => number_format($product->getPriceWithTax(), 2, '.', ''), 
                'categories' => $categories,
                'img_url' => $product->img_url 
            ];
        } else {
            
            $product = new Product(
                $row['id'],
                $row['title'],
                $row['description'],
                $price, 
                $row['is_taxable'],
                $categories,
                $row['img_url']
            );
            
            $products[] = [
                'id' => $product->id,
                'title' => $product->title,
                'description' => $product->description,
                'price' => number_format($product->price, 2, '.', ''), // Obținem prețul fără TVA formatat
                'categories' => $categories,
                'img_url' => $product->img_url
            ];
        }
    }
}

// returnam datele în format JSON
echo json_encode($products);
?>
