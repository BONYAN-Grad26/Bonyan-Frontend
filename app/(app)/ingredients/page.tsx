import IngredientsPage from '@/components/ingredients/MainPage'
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



  return (
    <IngredientsPage ingredients={ingredients} currentPage={+currentPage} />
  )
}

export default page
