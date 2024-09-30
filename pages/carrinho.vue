<template>
  <v-app>
    <div>
      <NavBarAuth></NavBarAuth>
      <v-main class="bg-grey-lighten-2  fill-height">
        <v-container class="bg-grey-lighten-4 "  >
          <h1>Carrinho:</h1>
          <div v-if="storedProducts.length > 0">
            <h3>Produtos Armazenados:</h3>
            <v-list>
              <v-list-item-group>
                <v-list-item
                  v-for="item in storedProducts"
                  :key="item.product_id"
                  
                >
                  <v-img :src="item.img" aspect-ratio="1"  contain class="item-image"></v-img>
                 
                  <v-list-item-content class="product-item">
                    <div class="item-info">
                      <v-list-item-title>{{ item.name }}</v-list-item-title>
                      <v-list-item-subtitle>
                        Preço: R$ {{ item.price }} | 
                        Quantidade: 
                        <v-btn @click="changeQuantity(item, -1)" icon small>
                          <v-icon small>mdi-minus</v-icon>
                        </v-btn>
                        {{ item.quantity }}
                        <v-btn @click="changeQuantity(item, 1)" icon small>
                          <v-icon small>mdi-plus</v-icon>
                        </v-btn>
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>
                        Total: R$ {{ (item.price * item.quantity).toFixed(2) }}
                      </v-list-item-subtitle>
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <h4>Total do Carrinho: R$ {{ totalCartValue.toFixed(2) }}</h4>
            <v-btn color="red" @click="clearCart">Limpar Carrinho</v-btn>
            <v-btn class="bg-blue">Continuar comprando</v-btn>
            <v-btn class="bg-green">Finalizar compra</v-btn>
          </div>
          <div v-else>
            <p>Nenhum produto encontrado no carrinho.</p>
          </div>
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useNuxtApp } from '#app';


const storedProducts = ref([]);


const loadProducts = async () => {
  const { $supabase } = useNuxtApp();
  const { data: { user }, error: userError } = await $supabase.auth.getUser();

  if (userError || !user) {
    console.error('Usuário não autenticado');
    return;
  }

  const { data: products, error: fetchError } = await $supabase
    .from('carrinhos')
    .select('*')
    .eq('user_id', user.id);

  if (fetchError) {
    console.error('Erro ao buscar produtos do carrinho:', fetchError.message);
    return;
  }

  storedProducts.value = products.map(product => ({
    ...product,
    quantity: 1 
  }));
};


loadProducts();


const changeQuantity = (item, delta) => {
  item.quantity += delta;
  if (item.quantity < 1) {
    removeProduct(item.product_id);
  }
};

const totalCartValue = computed(() => {
  return storedProducts.value.reduce((total, item) => total + (item.price * item.quantity), 0);
});

const removeProduct = (productId) => {
  storedProducts.value = storedProducts.value.filter(item => item.product_id !== productId);
};

const clearCart = async () => {
  const { $supabase } = useNuxtApp();
  const { data: { user }, error: userError } = await $supabase.auth.getUser();

  if (userError || !user) {
    console.error('Usuário não autenticado');
    return;
  }

  const { error } = await $supabase
    .from('carrinhos')
    .delete()
    .eq('user_id', user.id);

  if (error) {
    console.error('Erro ao limpar o carrinho:', error.message);
  } else {
    console.log('Carrinho limpo com sucesso.');
  }

  storedProducts.value = [];
};


</script>

<style scoped>
.product-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  height: 70%

}

.item-image {
  
  height: 100px;
  margin-left: 50rem; 
  
}
.item-info {
  flex: 0.5; 
}
</style>
