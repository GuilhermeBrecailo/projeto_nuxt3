<template>
  <v-app>
    <div>
      <NavBarAuth></NavBarAuth>
    </div>
    <v-main class="bg-grey-lighten-4">
      <v-container class="bg-grey-lighten-4" fluid>
        <v-card>
          <v-row v-if="product">
            <v-col cols="3" md="3">
              <v-img
                :src="product.img"
                aspect-ratio="1"
                height="300"
                class="mb-4"
              ></v-img>
            </v-col>
            <v-col cols="12" md="6" class="d-flex flex-column justify-space-between">
              <h1 class="display-1">{{ product.name }}</h1>
              <div>
                <h3 class="font-weight-bold price">{{ product.priceFormatted }}</h3>
              </div>
              <v-btn color="green" @click="adicionarAoCarrinho">
                Adicionar ao Carrinho
              </v-btn>
              <div></div>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col>
              <p>Carregando...</p>
            </v-col>
          </v-row>
        </v-card>
        <br>
        <v-card v-if="product">
          <h2>Descrição:</h2>
          <p class="description">{{ product.description }}</p>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchProductById } from '~/composables/api';

const route = useRoute();
const product = ref(null);

onMounted(async () => {
  const productId = route.params.id; 
  product.value = await fetchProductById(productId);
  if (product.value) {
    product.value.priceFormatted = `R$ ${product.value.price.toFixed(2)}`; // Formata o preço
  }
});

async function adicionarAoCarrinho() {
  const { $supabase } = useNuxtApp();
  const { data: { user }, error: userError } = await $supabase.auth.getUser();

  if (userError || !user) {
    console.error('Usuário não autenticado');
    return;
  }

  const produto = {
    user_id: user.id,
    product_id: product.value.id,
    quantity: 1,
    name: product.value.name,
    img: product.value.img,
    price: product.value.price,
    description: product.value.description,
  };

  try {
    await $supabase.from('carrinhos').insert([produto]);
    console.log('Produto adicionado ao carrinho:', produto);
  } catch (error) {
    console.error('Erro ao adicionar produto ao carrinho:', error.message);
  }
}
</script>

<style scoped>
.v-img {
  border-radius: 4px;
}
.price {
  color: black;
  font-size: 2em; 
}
.description {
  color: grey; 
}
</style>
