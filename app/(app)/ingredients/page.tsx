import IngredientsPage from '@/components/ingredients/MainPage'
import { getCart } from '@/serverActions/cart';
import { getIngredients } from '@/serverActions/ingredients';

interface PageProps {
    searchParams:Promise<{currentPage:string}>
}

const page = async ({searchParams}:PageProps) => {
    const {currentPage} = await searchParams;
    if(!currentPage) {
        throw new Error('CurrentPage is required');
    }

    const ingredients = await getIngredients(+currentPage);
    const cart = await getCart();



  return (
    <IngredientsPage cart={cart}  ingredients={ingredients} currentPage={+currentPage} />
  )
}

export default page
