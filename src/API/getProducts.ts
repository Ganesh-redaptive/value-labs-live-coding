import axios from 'axios';
import { PRODUCTS_API_ENDPOINT } from './consts';
export const getProductDetails = async ()=> {
    try{

        const response = await axios.get(PRODUCTS_API_ENDPOINT);
        return response.data;
    }
    catch (error){
        throw new Error(error.message);
    }
}