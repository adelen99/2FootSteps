<?php 
    require_once 'Product.php'; 

    class TaxableProduct extends Product {
        public function getPriceWithTax() {
            return $this->price * 1.19; // TVA 19%
        }
    }
?>