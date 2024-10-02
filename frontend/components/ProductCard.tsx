import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/utils/types";
import Image from "next/image";
import { addToCart } from "@/utils/actions";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast();

  const handleAddToCart = async () => {
    try {
      const updatedCart = await addToCart(product, 1);
      console.log("Updated cart:", updatedCart);
      toast({
        description: "Produsul a fost adăugat în coș!",
      });
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast({
        description: "A apărut o eroare la adăugarea produsului.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className='w-[400px] md:w-[500px] lg:w-[600px] p-12 mt-12 shadow-lg hover:shadow-xl transition-shadow duration-200'>
      <CardContent>
        <Image
          width={600}
          height={400}
          src={product.img_url}
          alt={product.title}
          className='w-full h-72 rounded-xl object-cover'
        />
        <CardHeader>
          <CardTitle className='text-xl font-semibold'>
            {product.title}
          </CardTitle>
          <CardDescription className='text-gray-600'>
            {product.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='mt-2'>
            <span className='font-bold'>Preț: {product.price} RON</span>
          </div>
        </CardContent>
      </CardContent>
      <CardContent className='flex justify-between ml-6'>
        <Button variant='default' onClick={handleAddToCart}>
          Adaugă în coș
        </Button>
      </CardContent>
    </Card>
  );
}
