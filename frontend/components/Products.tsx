"use client";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "@/utils/actions";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/utils/types";
import { Button } from "./ui/button";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleProducts, setVisibleProducts] = useState(3);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const fetchedProducts = await fetchAllProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Eroare la preluarea produselor:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className='shadow-md border p-2 rounded-xl'>
            <CardContent>
              <Skeleton className='h-32 w-full mb-2' />
              <Skeleton className='h-32 w-1/2' />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
      {products.slice(0, visibleProducts).map((product) => (
        <Card key={product.id} className='shadow-md border rounded-lg'>
          <CardContent>
            <img
              src={product.img_url}
              alt={product.title}
              className='w-full h-72 p-2 object-cover rounded-xl' // sau object-cover
              // Optional, pentru a centra imaginea
            />
            {/* Adaugă imaginea aici */}
            <h1 className='text-lg'>{product.title}</h1>
            <p className='text-md mt-2'>Preț: {product.price} RON</p>
          </CardContent>
          <CardFooter>
            <Link href={`/products/${product.id}`}>
              <Button size='default'>Vezi detalii</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
      {visibleProducts < products.length && (
        <div className='col-span-full mt-4 text-center'>
          <Button
            onClick={() =>
              setVisibleProducts(visibleProducts + products.length)
            }
            size='default'>
            Vizualizează mai multe produse
          </Button>
        </div>
      )}
    </div>
  );
};

export default Products;
