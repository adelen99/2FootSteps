import HeroDescription from "@/components/HeroDescription";
import { HeroCarousel } from "@/components/HeroCarousel";
import Products from "@/components/Products"; // Importă componenta Products
import ProductsHeader from "@/components/ProductsHeader";

const HomePage = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 p-4'>
      <div className='flex items-start'>
        <HeroDescription />
      </div>
      <div className='hidden md:block'>
        <HeroCarousel />
      </div>
      <div className='w-full md:hidden'>
        <HeroCarousel />
      </div>
      <div className='col-span-1 lg:col-span-2 w-3/4 mx-auto'>
        <ProductsHeader />
        <Products />
      </div>
    </div>
  );
};

export default HomePage;
