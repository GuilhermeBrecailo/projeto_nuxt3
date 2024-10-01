<template>
  

<v-app>
 <div>
     <div>
         <NavBarAuth></NavBarAuth>
     </div>
     <v-main>

         <v-container>
             <v-row justify="center">
                <v-col cols="12" md="6">
                    <v-card class="pa-4" outilned>
                        <v-card-title class="text-h5 text-center">

                            Cadastre um produto
                        </v-card-title>
                        <v-card-text>
                          <v-form @submit.prevent="submitProduct">
                                    <v-text-field 
                                    required
                                    outlined
                                    v-model="product.name"
                                    label="Titulo"
                                    ></v-text-field>
                                    <v-text-field 
                                    required
                                    outlined
                                    v-model="product.description"
                                    
                                    label="Descrição"
                                    ></v-text-field>
                                    <v-text-field 
                                    required
                                    outlined
                                    v-model="product.price"

                                    label="Preço"
                                    ></v-text-field>
                                    <v-text-field 
                                    required
                                    outlined
                                    v-model="product.img"
                                    
                                    label="Url da imagem"
                                    ></v-text-field>
                                    
                                    <v-btn block type="submit" color="primary">Cadastrar</v-btn>

                                </v-form>
                                <div class="mt-4 text-center">
                                   <v-img
                                        v-if="product.img"
                                        :src="product.img"
                                        height="200"
                                        width="200"
                                        class="mx-auto"
                                        contain
                                        v-bind:alt="`${product.name} - Imagem`"
                  ></v-img>
                </div>
                        </v-card-text>

                    </v-card>

                </v-col>
             </v-row>
         </v-container>
     </v-main>
 </div>
</v-app>
</template>


<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

 const { $supabase } = useNuxtApp();

const product = ref({
  name: '',
  description: '',
  price: 0,
  img: ''
});


const submitProduct = async () => {
    
  const { data: { user }, error: userError } = await $supabase.auth.getUser();

  if (userError || !user) {
  console.error('Usuário não está autenticado ou erro ao obter usuário:', userError);
  return;
}
if (product.price > 99999999.99) {
            console.error('Preço excede o limite permitido.');
            return;
        }
  const { data, error } = await $supabase
    .from('products')
    .insert([{ ...product.value, user_id: user.id }])

  if (error) {
    console.error('Erro ao cadastrar produto:', error)
  } else {
    console.log('Produto cadastrado com sucesso:', data)
    product.value = { name: '', description: '', price: 0, img: '' }
    router.push('/'); 
  }
}
</script>