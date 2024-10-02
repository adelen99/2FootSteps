import { Button } from "../ui/button";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";

async function CartButton() {
  return (
    <Button
      asChild
      variant='outline'
      size='icon'
      className='flex justify-center items-center relative'>
      <Link href='/cart'>
        <FaShoppingCart className='text-lg' />
      </Link>
    </Button>
  );
}

export default CartButton;
