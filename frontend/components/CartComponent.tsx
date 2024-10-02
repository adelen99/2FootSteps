"use client";
import React, { useEffect, useState } from "react";
import CheckoutForm from "@/components/CheckoutForm";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CartItem } from "@/utils/types";

const CartComponent = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [showCheckout, setShowCheckout] = useState<boolean>(false);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get("http://localhost/my_project/cart.php");
      setCartItems(response.data.items);
      setCartTotal(response.data.cartTotal);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const handleDelete = async (cart_id: number) => {
    try {
      await axios.post("http://localhost/my_project/cart.php", { cart_id });
      fetchCartItems();
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const clearCart = async () => {
    try {
      await axios.post("http://localhost/my_project/clearcart.php");
      fetchCartItems();
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className='p-4 max-w-2xl mx-auto'>
      {showCheckout ? (
        <CheckoutForm totalAmount={cartTotal} onOrderPlaced={clearCart} />
      ) : (
        <div>
          {cartItems.length > 0 ? (
            <div>
              <h2 className='text-2xl font-bold mb-4'>Produse în coș:</h2>
              <div className='grid gap-4'>
                {cartItems.map((item) => (
                  <Card
                    key={item.cart_id}
                    className='p-4 mt-4 border rounded-lg shadow-md flex items-center'>
                    <div className='flex-grow'>
                      <h3 className='text-lg font-semibold'>
                        {item.product_name}
                      </h3>
                      <p>Cantitate: {item.quantity}</p>
                      <p>Pret: {item.price} RON</p>
                      <Button
                        variant='destructive'
                        className='mt-2'
                        onClick={() => handleDelete(item.cart_id)}>
                        Șterge
                      </Button>
                    </div>
                    <img
                      src={item.img_url}
                      alt={item.product_name}
                      className='w-32 h-32 mr-4 rounded-xl'
                    />
                  </Card>
                ))}
              </div>
              <h3 className='my-2 text-xl font-semibold'>
                Total General: {cartTotal} RON
              </h3>
              <Button
                variant='destructive'
                className='w-full'
                onClick={handleCheckout}>
                Checkout
              </Button>
            </div>
          ) : (
            <div className='grid items-center justify-center h-full text-center'>
              <p className='text-3xl font-bold p-4'>Coșul tău este gol</p>
              <Button>Viziteaza produsele noastre</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartComponent;
