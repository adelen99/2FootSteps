// types.ts
export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  is_taxable: boolean;
  categories: string[];
  img_url: string;
};

export interface CartItem {
  cart_id: number;
  product_id: number;
  product_name: string;
  price: number;
  quantity: number;
  img_url: string;
}

export interface CartResponse {
  items: CartItem[];
  cartTotal: number;
}

export interface Order {
  order_id: number;
  order_date: string;
  customer_name: string;
  customer_email: string;
  total_quantity: number;
}
