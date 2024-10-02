<template>
  <v-app>
    <NavBarAuth />
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="6">
            <v-card class="pa-4" outlined>
              <v-card-title class="text-h5 text-center">
                Editar Produto
              </v-card-title>
              <v-card-text>
                <v-form @submit.prevent="submitProduct">
                  <v-text-field 
                    required
                    outlined
                    v-model="product.name"
                    label="Título"
                  />
                  <v-text-field 
                    required
                    outlined
                    v-model="product.description"
                    label="Descrição"
                  />
                  <v-text-field 
                    required
                    outlined
                    v-model="product.price"
                    label="Preço"
                    type="number"
                  />
                  <v-text-field 
                    required
                    outlined
                    v-model="product.img"
                    label="URL da Imagem"
                  />
                  
                  <v-btn block type="submit" color="primary">Salvar</v-btn>
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
                  />
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { fetchProductById, updateProduct } from '@/composables/api'; 

const router = useRouter();
const route = useRoute();
const product = ref({
  name: '',
  description: '',
  price: 0,
  img: ''
});


const fetchProduct = async () => {
  const productId = route.params.id; 
  const data = await fetchProductById(productId);

  if (data) {
    product.value = data; 
  }
};


onMounted(fetchProduct);

const submitProduct = async () => {
  
  try {
    await updateProduct(route.params.id, product.value);
    console.log('Produto atualizado com sucesso:', product.value);
    alert('Produto atualizado')

    router.push('/'); 
  } catch (error) {
    console.error('Erro ao atualizar produto:', error.message);
  }
};
</script>

<style scoped>
.v-img {
  border-radius: 4px;
}
</style>
