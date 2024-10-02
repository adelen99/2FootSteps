<?php

    class Category {
        public $id;
        public $name;

        public function __construct($id, $name){
            $this->id = $id;
            $this->name = $name;
        }

        public static function getAllCategories() {
            global $db;
            $query = "SELECT * FROM categories";
            $result = $db->query($query);

            $categories = [];
            while ($row = $result->fetch_assoc()) {
                $categories[] = new Category($row['id'], $row['name']);
            }
            return $categories;
        }
    }

?>