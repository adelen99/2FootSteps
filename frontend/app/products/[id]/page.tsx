// app/products/[id]/page.tsx
"use client"; // Marcare ca Client Component

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Import corect din next/navigation
import { fetchSingleProduct } from "@/utils/actions"; // Asigură-te că calea este corectă
import { Product } from "@/utils/types"; // Import corect al tipurilor
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IoReturnUpBack } from "react-icons/io5";

const ProductDetail: React.FC = () => {
  const { id } = useParams(); // Obținem ID-ul din parametrii URL
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProduct = async () => {
      if (id) {
        try {
          const data = await fetchSingleProduct(Number(id)); // Conversia ID-ului la număr
          setProduct(data);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      }
    };

    getProduct();
  }, [id]);

  if (loading) return <p>Se încarcă...</p>;
  if (error) return <p>Ceva a mers prost: {error}</p>;

  if (!product) return <p>Produsul nu a fost găsit.</p>;

  return (
    <div className='flex justify-center relative p-4'>
      <Link href='/' className='absolute top-4 left-4'>
        <Button className='flex items-center'>
          <IoReturnUpBack className='text-xl text-black dark:text-foreground mr-2' />
        </Button>
      </Link>
      <ProductCard product={product} />
    </div>
  );
};
export default ProductDetail;
