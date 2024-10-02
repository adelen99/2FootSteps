<?php

class Cart {
    public $items = [];
    public $total = 0;

    public function addProduct(Product $product, $quantity) {
        $productId = $product->id;

        // Dacă produsul este deja în coș, actualizează cantitatea
        if (isset($this->items[$productId])) {
            $this->items[$productId]['quantity'] += $quantity;
        } else {
            $this->items[$productId] = [
                'product' => $product,
                'quantity' => $quantity
            ];
        }

        // Actualizează totalul
        $this->updateTotal();
    }

    private function updateTotal() {
        $this->total = 0;
        foreach ($this->items as $item) {
            $this->total += $item['product']->price * $item['quantity'];
        }
    }

    public function getTotalAmount() {
        return $this->total;
    }
}

?>

 