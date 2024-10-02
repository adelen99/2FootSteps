"use client"; // Asigură-te că folosești directivele corecte pentru Next.js

import React, { useEffect, useState } from "react";
import CheckoutForm from "@/components/CheckoutForm";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { CartItem } from "@/utils/types"; // Importă tipul CartItem

function CheckoutPage() {
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // functie pentru a obtine totalul cosului și articolele din coș
  const fetchCartData = async () => {
    try {
      const response = await axios.get("http://localhost/my_project/cart.php");
      setCartItems(response.data.items);
      setCartTotal(response.data.cartTotal);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  // folosim useEffect pentru a apela functia de fetch la montarea componentului
  useEffect(() => {
    fetchCartData();
  }, []);

  // functia care va fi apelata dupa plasarea comenzii
  const handleOrderPlaced = async () => {
    try {
      // trimite o cerere pentru a goli cosul
      await axios.post("http://localhost/my_project/clearcart.php");
      setCartTotal(0); // reseteaza totalul local al cosului
      setCartItems([]); // goleste lista de articole din cos
      toast({
        description: "Comanda plasată cu succes!",
      });
      console.log("Coșul a fost golit.");
    } catch (error) {
      console.error("Eroare la golirea coșului:", error);
    }
  };

  return (
    <>
      <CheckoutForm totalAmount={cartTotal} onOrderPlaced={handleOrderPlaced} />
    </>
  );
}

export default CheckoutPage;
