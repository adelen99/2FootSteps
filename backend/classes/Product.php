<?php
class Product {
    public $id;
    public $title;
    public $description;
    public $price;
    public $is_taxable;
    public $categories = []; // Array pentru a gestiona categoriile
    public $img_url; // Adăugăm acest câmp pentru URL-ul imaginii

    public function __construct($id, $title, $description, $price, $is_taxable, $categories = [], $img_url = '') {
        $this->id = $id;
        $this->title = $title;
        $this->description = $description;
        $this->price = $price;
        $this->is_taxable = $is_taxable;
        $this->categories = $categories; // Populăm categoriile direct în constructor
        $this->img_url = $img_url; // Populăm URL-ul imaginii
    }

    public function getCategories() {
        return $this->categories; // Metodă pentru a obține categoriile asociate
    }

    public function loadCategories() {
        global $db; // Accesăm baza de date
        $query = "SELECT c.id, c.name 
                  FROM categories c 
                  JOIN product_categories pc ON c.id = pc.category_id 
                  WHERE pc.product_id = ?";
        $stmt = $db->prepare($query);
        $stmt->bind_param("i", $this->id);
        $stmt->execute();
        
        $result = $stmt->get_result();
        while ($row = $result->fetch_assoc()) {
            $this->categories[] = new Category($row['id'], $row['name']); // Adăugăm categoriile în array-ul $categories
        }
    }

    public function getPriceWithTax() {
        if ($this->is_taxable) {
            return $this->price * 1.19; // TVA 19%
        }
        return $this->price;
    }
}
?>
