<?php
class Order {
    public $id;
    public $customerName;
    public $customerEmail;
    public $customerPhone;
    public $customerAddress;
    public $items = [];
    public $orderDate;
    public $totalAmount;

    public function __construct($id, $customerName, $customerEmail, $customerPhone, $customerAddress, $orderDate, $totalAmount, $items = []) {
        $this->id = $id;
        $this->customerName = $customerName;
        $this->customerEmail = $customerEmail;
        $this->customerPhone = $customerPhone;
        $this->customerAddress = $customerAddress;
        $this->items = $items;
        $this->orderDate = $orderDate;
        $this->totalAmount = $totalAmount;
    }

    public function saveOrder() {
        global $db;
        $query = "INSERT INTO orders (customer_name, customer_email, customer_phone, customer_address, order_date, total_amount)
                  VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $db->prepare($query);
        $stmt->bind_param("sssssd", $this->customerName, $this->customerEmail, $this->customerPhone, $this->customerAddress, $this->orderDate, $this->totalAmount);
        $stmt->execute();
    
        $this->id = $db->insert_id;

        foreach ($this->items as $item) {
            $query = "INSERT INTO order_items (order_id, product_id, quantity, price)
                      VALUES (?, ?, ?, ?)";
            $stmt = $db->prepare($query);
            $stmt->bind_param("iiid", $this->id, $item['product']->id, $item['quantity'], $item['product']->price);
            $stmt->execute();
        }
    
        return $this->id;
    }

    public static function getOrderById($orderId) {
        global $db;
        
        $query = "SELECT * FROM orders WHERE id = ?";
        $stmt = $db->prepare($query);
        $stmt->bind_param("i", $orderId);
        $stmt->execute();
        
        $result = $stmt->get_result();
        return $result->fetch_assoc(); // Returnează detaliile comenzii sub formă de array asociativ
    }
}
?>
