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
                  @product-removed="loadProducts"
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
        session: null,
      };
    },
    mounted() {
     
     
        const { $supabase } = useNuxtApp();
    
    $supabase.auth.getSession().then(({ data: { session } }) => {
      this.isAuthenticated = !!session;
      this.session = session; 
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

    
  async loadProducts() {
    if (this.session && this.session.user) {
      this.products = await fetchProductByUser(this.session.user.id);
      console.log('Produtos carregados', this.products);
    } else {
      console.error('Usuário não autenticado ou sessão inválida');
    }
    
  
   },
  }
   }
</script>