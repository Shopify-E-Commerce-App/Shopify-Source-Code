import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import { products } from "@/utils/products";
import { truncateText } from "@/utils/truncateText";
import ProductCard from "./components/products/ProductCart";
import getProducts, { IProductParams } from "@/actions/getProducts";
import NullData from "./components/NullData";


interface HomeProps{
  searchParams: IProductParams
}
export default async function Home({searchParams} : HomeProps) {
  const Product = await getProducts(searchParams);

  if(products.length === 0){
    return <NullData title="No Products"/>
  }

  function shuffleArray(array : any){
    for(let i = array.length - 1; i >= 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  const shuffledProducts = shuffleArray(products);
  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner/>
        </div>
        <div className="grid grid-cols-2
        sm:grid-cols-3 
        lg:grid-cols-4
         xl:grid-cols-5
        2xl:grid-cols-6 
        gap-8">
        
          {shuffledProducts.map((product: any) =>{
            // eslint-disable-next-line react/jsx-key
            return <ProductCard data={product}/>;
          }
          
          )}
        </div>
      </Container>
    </div>
  );
};
