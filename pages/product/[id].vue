<template>
    <v-app>
      <div>
        <NavBarAuth></NavBarAuth>
      </div>
      <v-main class="bg-grey-lighten-4">
        <v-container class="bg-grey-lighten-4" fluid>
          <v-row v-if="product">
            <v-col cols="12" md="6">
              <v-img
                :src="product.img"
                aspect-ratio="1"
                height="400"
                class="mb-4"
              ></v-img>
            </v-col>
            <v-col cols="12" md="6" class="d-flex flex-column justify-space-between">
              <div>
                <h1 class="display-1">{{ product.name }}</h1>
                <p class="description">{{ product.description }}</p>
                
                <h3 class="font-weight-bold price">{{ product.priceFormatted }}</h3>
              </div>
              <v-btn color="green" @click="addToCart">
                Adicionar ao Carrinho
              </v-btn>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col>
              <p>Carregando...</p>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script setup>
  
  import { fetchProductById } from '~/composables/api';
  
  const route = useRoute();
  const product = ref(null);
  
  onMounted(async () => {
    const productId = route.params.id; 
    product.value = await fetchProductById(productId);
    product.value.priceFormatted = `R$ ${product.value.price.toFixed(2)}`; // Formata o preço
  });
  
  function addToCart() {
    alert(`${product.value.name} foi adicionado ao carrinho!`);
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
  