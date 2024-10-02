import Link from "next/link";
import { Button } from "../ui/button";
import { IoFootstepsSharp } from "react-icons/io5";

function Logo() {
  return (
    <div className='flex items-center space-x-2'>
      <Button size='icon' asChild>
        <Link href='/'>
          <IoFootstepsSharp className='text-2xl text-black dark:text-primary-foreground' />
        </Link>
      </Button>
      <Link
        href='/'
        className='text-primary scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl'>
        2Foot
        <span className='text-black dark:text-primary-foreground'>steps</span>
      </Link>
    </div>
  );
}

export default Logo;
