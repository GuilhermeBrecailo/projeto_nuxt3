<template>
    <v-app>
        <div>
            <div>
                <NavBarAuth></NavBarAuth>
            </div>
        </div>
        <v-main class="bg-grey-lighten-2">
          <v-container class="bg-grey-lighten-4" >
                
                <h1>Meus produtos</h1>

                <div >
                    <MyProduct 
                    v-for="product in products"
                   :key="product.id"
                  :product="product"
                 
                    />
                </div>
                
            </v-container>
        </v-main>
    </v-app>
</template>

<script>

import { fetchProductByUser } from '~/composables/api';



  export default{

    data(){
      return{
        isAuthenticated: false,
        products: [],
      
      };
    },
    mounted() {
     
     
        const { $supabase } = useNuxtApp();
    
    $supabase.auth.getSession().then(({ data: { session } }) => {
      this.isAuthenticated = !!session;
      console.log(this.isAuthenticated);
      console.log('Session:', session);

      if (this.isAuthenticated) {
        this.loadProducts(session.user.id); 
      }
    }).catch((error) => {
      console.error('Erro ao obter sessão', error);
    });
  },
methods: {

    
    async loadProducts(userId) {
      this.products = await fetchProductByUser(userId);
      console.log('Produtos carregados',this.products)
    },
    
  
  },
};
</script>