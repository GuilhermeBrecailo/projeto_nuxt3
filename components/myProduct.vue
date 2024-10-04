
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
            <h3 style="color: black; font-size: 1.5em; margin: 0;">R$ {{product.price}}</h3>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-actions class="justify-end">
        <v-btn class="bg-red" @click="removeProduct(product.id)">Apagar</v-btn>
        <v-btn
        :to="{ name: 'products-id', params: { id: product.id } }"
        color="primary bg-blue"
        text
        >
        Ver Detalhes
      </v-btn>
      <v-btn :to="`/products/${product.id}.edit`" color="white" class="bg-green">Editar</v-btn>





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
    
    async removeProduct(productId) {
      const { $supabase } = useNuxtApp();
      const { data: { user }, error: userError } = await $supabase.auth.getUser();

      if (userError || !user) {
        console.error('Usuário não autenticado');
        return;
      }

      console.log('Removendo produto:', productId);
      console.log('Usuário ID:', user.id);

      const { error } = await $supabase
        .from('products')
        .delete()
        .eq('user_id', user.id)
        .eq('id', productId); 

      if (error) {
        console.error('Erro ao remover produto:', error.message);
      } else {
        console.log('Produto removido com sucesso:', productId);
        
        this.$emit('product-removed', productId);
       
      }
    },
  },
};
</script>