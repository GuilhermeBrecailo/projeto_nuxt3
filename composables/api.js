// import axios from 'axios';

// const apiClient = axios.create({
//     baseURL: 'https://fakestoreapi.com',
//     headers: {
//         'Content-Type' : 'application/json'
//     }
// });

// export const fetchProducts = async () => {
//     try {
//         const response = await apiClient.get('/products');
//         return response.data;

//     }catch (error){
//         console.error('Erro ao procurar produtos', error)
//         return[]
//     }
// }

import { useNuxtApp } from '#app';


export async function storePayment(id, amount) {
  const { $supabase } = useNuxtApp();

  const { data, error } = await $supabase
      .from('payments')
      .insert([{ id, amount, status: 'succeeded' }]);
  
  if (error) {
      console.error('Erro ao armazenar pagamento:', error);
  }
  
  return data; 
}


export const fetchProducts = async () => {
    const { $supabase } = useNuxtApp();
    
    const { data, error } = await $supabase
        .from('products')
        .select('*'); 

    if (error) {
        console.error('Erro ao buscar produtos:', error);
        return [];
    }
    return data;
};
export async function fetchProductById(id) {
    const { $supabase } = useNuxtApp();
    const { data, error } = await $supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
      
  
    if (error) {
      console.error('Erro ao buscar produto:', error);
      return null; 
    }
  
    return data; 
};
export async function updateProduct(id, product) {
  const { $supabase } = useNuxtApp();

  const { error } = await $supabase
    .from('products')
    .update(product)
    .eq('id', id);

  if (error) {
    throw new Error('Erro ao atualizar produto: ' + error.message);
  }
}
export async function fetchProductByUser(userId) {
  const { $supabase } = useNuxtApp();
  const { data, error } = await $supabase
    .from('products')
    .select('*')
    .eq('user_id', userId)
    

  if (error) {
    console.error('Erro ao buscar produto:', error);
    return null; 
  }

  return data; 
 
};
