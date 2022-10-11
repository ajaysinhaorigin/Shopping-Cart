import axios from "axios";

async function getProductsData(){
   const response = await axios.get('https://dummyjson.com/products')
   return response.data.products;
}
export default getProductsData;