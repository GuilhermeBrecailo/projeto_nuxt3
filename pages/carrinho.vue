<template>
  <v-app>
    <div>
      <NavBarAuth></NavBarAuth>
      <v-main class="bg-grey-lighten-2 ">
        <v-container class="bg-grey-lighten-4">
          <h1>Carrinho:</h1>
          <div v-if="storedProducts.length > 0">
            <v-row>
              <v-col
                v-for="item in storedProducts"
                :key="item.product_id"
                cols="12"
              >
                <v-card>
                  <v-card-title>
                    <v-row>
                      <v-col cols="3">
                        <v-img :src="item.img" aspect-ratio="1" height="150" contain></v-img>
                      </v-col>
                      <v-col cols="9">
                        <h3>{{ item.name }}</h3>
                        <p>Preço: R$ {{ item.price }}</p>
                        <p>
                          Quantidade: 
                          <v-btn @click="changeQuantity(item, -1)" icon small>
                            <v-icon small>mdi-minus</v-icon>
                          </v-btn>
                          {{ item.quantity }}
                          <v-btn @click="changeQuantity(item, 1)" icon small>
                            <v-icon small>mdi-plus</v-icon>
                          </v-btn>
                        </p>
                        <h4>Total: R$ {{ (item.price * item.quantity).toFixed(2) }}</h4>
                      </v-col>
                    </v-row>
                  </v-card-title>
                </v-card>
              </v-col>
            </v-row>
            <h4>Total do Carrinho: R$ {{ totalCartValue.toFixed(2) }}</h4>
            <v-btn color="red" @click="clearCart">Limpar Carrinho</v-btn>
            <v-btn class="bg-blue" to="/">Continuar comprando</v-btn>
            <v-btn class="bg-green" to="/payment">Finalizar compra</v-btn>
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
import { ref, computed, onMounted } from 'vue';
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
    quantity: 1,
  }));
};

const changeQuantity = (item, delta) => {
  item.quantity += delta;
  if (item.quantity < 1) {
    removeProduct(item.product_id);
    
  }
};

const totalCartValue = computed(() => {
  return storedProducts.value.reduce((total, item) => total + (item.price * item.quantity), 0);
});

const removeProduct = async (productId) => {
  const { $supabase } = useNuxtApp();
  const { data: { user }, error: userError } = await $supabase.auth.getUser();

  if (userError || !user) {
    console.error('Usuário não autenticado');
    return;
  }

  console.log('Removendo produto:', productId); 
  console.log('Usuário ID:', user.id); 

  const { error } = await $supabase
    .from('carrinhos')
    .delete()
    .eq('user_id', user.id)
    .eq('product_id', productId);

  if (error) {
    console.error('Erro ao remover produto do carrinho:', error.message);
  } else {
    console.log('Produto removido com sucesso:', productId);
    storedProducts.value = storedProducts.value.filter(item => item.product_id !== productId);
    console.log('Produtos restantes:', storedProducts.value);
    await loadProducts();
  }
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
    alert("Carrinho limpo com sucesso")
    storedProducts.value = [];
    console.log('Carrinho limpo com sucesso');
  }
};

onMounted(loadProducts);
</script>

<style scoped>
.product-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  height: 70%;
}

.item-image {
  height: 100px;
  margin-left: 50rem; 
}
.item-info {
  flex: 0.5; 
}
</style>
