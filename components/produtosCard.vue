<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-row>
          <v-col cols="3">
            <v-img :src="product.img" aspect-ratio="1" class="white--text" height="200" contain></v-img>
          </v-col>
          <v-col cols="9">
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
            <h3 style="color: black; font-size: 1.5em; margin: 0;">R$ {{ product.price }}</h3>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-actions class="justify-end">
        <v-btn
        :to="{ name: 'products-id', params: { id: product.id } }"
        color="primary bg-blue"
        text
        >
        Ver Detalhes
      </v-btn>
      <v-btn color="seconfary bg-green" @click="adicionarAoCarrinho">Adicionar ao Carrinho</v-btn>
      
    </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    product: Object,
  },
  methods: {
    async adicionarAoCarrinho() {
      const { $supabase } = useNuxtApp();
      const { data: { user }, error: userError } = await $supabase.auth.getUser();

      if (userError || !user) {
        console.error('Usuário não autenticado');
        return;
      }

 

      const produto = {
        user_id: user.id,
        product_id: this.product.id,
        quantity: 1,
        name: this.product.name,
        img: this.product.img,
        price: this.product.price,
        description: this.product.description,
      };

      try {
        
        await $supabase.from('carrinhos').insert([produto]);

        alert('Produto adicionado ao carrinho')
        console.log('Produto adicionado ao carrinho:', produto);
        return;
      } catch (error) {
        console.error('Erro ao adicionar produto ao carrinho:', error.message);
      }
    },
  },
}
</script>
