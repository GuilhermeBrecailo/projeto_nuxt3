<template>
    <v-app>
      <div>
        <NavBarAuth></NavBarAuth>
        <v-main class="bg-grey-lighten-2">
          <v-container class="bg-grey-lighten-4">
            <h1>Pagamento com Stripe</h1>
            <div v-if="storedProducts.length > 0">
              <h2>Itens do Carrinho:</h2>
              <v-row>
                <v-col v-for="item in storedProducts" :key="item.product_id" cols="12">
                  <v-card>
                    <v-card-title>
                      <v-row>
                        <v-col cols="3">
                          <v-img :src="item.img" aspect-ratio="1" height="150" contain></v-img>
                        </v-col>
                        <v-col cols="9">
                          <h3>{{ item.name }}</h3>
                          <p>Preço: R$ {{ item.price }}</p>
                          <p>Quantidade: {{ item.quantity }}</p>
                          <h4>Total: R$ {{ (item.price * item.quantity).toFixed(2) }}</h4>
                        </v-col>
                      </v-row>
                    </v-card-title>
                  </v-card>
                </v-col>
              </v-row>
              <h4>Total do Carrinho: R$ {{ totalCartValue.toFixed(2) }}</h4>
              <v-text-field v-model="cep" label="CEP de Entrega" placeholder="Digite seu CEP" @blur="calculateFrete"></v-text-field>
              <h4>Frete: R$ {{ frete.toFixed(2) }}</h4>
              <h4>Total com Frete: R$ {{ totalWithFrete.toFixed(2) }}</h4>
              <v-select v-model="installments" :items="installmentOptions" label="Número de Parcelas"></v-select>
              <h4>Valor da Parcela: R$ {{ installmentValue.toFixed(2) }}</h4>
              <v-form @submit.prevent="handleSubmit">
                <v-card>
                  <v-card-title>Detalhes do Cartão</v-card-title>
                  <v-card-text>
                    <div id="card-element"></div>
                    <div id="card-errors" role="alert"></div>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn type="submit">Pagar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-form>
              <div v-if="message">{{ message }}</div>
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
  import { loadStripe } from '@stripe/stripe-js';
  import { useNuxtApp } from '#app';
  
  const storedProducts = ref([]);
  const frete = ref(0);
  const cep = ref('');
  const installments = ref(1);
  const message = ref('');
  const stripe = ref(null);
  const card = ref(null);
  const installmentOptions = [1, 2, 3, 4, 5, 6];
  
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
  
  const totalCartValue = computed(() => {
    return storedProducts.value.reduce((total, item) => total + (item.price * item.quantity), 0);
  });
  
  const totalWithFrete = computed(() => {
    return totalCartValue.value + (parseFloat(frete.value) || 0);
  });
  
  const installmentValue = computed(() => {
    return totalWithFrete.value / installments.value;
  });
  
  onMounted(async () => {
    await loadProducts();
    stripe.value = await loadStripe('pk_test_51Q0CV3CulV1yOIAgQjodzHU153dAvHimpKo1wnqB8g8rS7Xr6dr10Or8N58dnhqvgJH96Ekvhy8W0tIZdRNuPsKF005LZoMN0v');
    const elements = stripe.value.elements();
    card.value = elements.create('card');
    card.value.mount('#card-element');
  });
  
  const handleSubmit = async () => {
  const clientSecret = await createPaymentIntent();
  if (!clientSecret) {
    message.value = 'Erro ao criar pagamento. Tente novamente.';
    return;
  }

  const { error, paymentIntent } = await stripe.value.confirmCardPayment(clientSecret, {
    payment_method: {
      card: card.value,
    },
  });

  if (error) {
    message.value = error.message;
  } else {
    message.value = 'Pagamento bem-sucedido!';
    await storePayment(paymentIntent.id, paymentIntent.amount);
  }
};

const createPaymentIntent = async () => {
  const response = await fetch('/api/create-payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount: totalWithFrete.value * 100 }),
  });
  const data = await response.json();
  
  if (data && data.clientSecret) {
    return data.clientSecret;
  } else {
    console.error('Erro ao obter clientSecret:', data);
    return null;
  }
};

  
  const storePayment = async (id, amount) => {
    const { $supabase } = useNuxtApp();
    const result = await $supabase
      .from('payments')
      .insert([{ id, amount, status: 'succeeded' }]);
  
    if (result.error) {
      console.error('Erro ao armazenar pagamento:', result.error.message);
    } else {
      console.log('Pagamento armazenado com sucesso:', result.data);
    }
  };
  
  const calculateFrete = () => {
    if (!cep.value) {
      frete.value = 0;
      return;
    }
  
    const randomFrete = (Math.random() * (30 - 20) + 20).toFixed(2);
    frete.value = parseFloat(randomFrete);
  };
  </script>
  
  <style scoped>
  </style>
  