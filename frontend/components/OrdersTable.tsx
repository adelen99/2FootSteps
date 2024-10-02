"use client";
import React, { useEffect, useState } from "react";
import { Order } from "@/utils/types";
const OrdersTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "http://localhost/my_project/get_orders.php"
        );
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Eroare la obținerea comenzilor:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Tabel Comenzi</h1>
      <table className='min-w-full border-collapse border border-gray-200'>
        <thead>
          <tr>
            <th className='border border-gray-300'>ID Comandă</th>
            <th className='border border-gray-300'>Data Comenzii</th>
            <th className='border border-gray-300'>Nume Client</th>
            <th className='border border-gray-300'>Email Client</th>
            <th className='border border-gray-300'>Număr Produse</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id}>
              <td className='border border-gray-300'>{order.order_id}</td>
              <td className='border border-gray-300'>{order.order_date}</td>
              <td className='border border-gray-300'>{order.customer_name}</td>
              <td className='border border-gray-300'>{order.customer_email}</td>
              <td className='border border-gray-300'>{order.total_quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
