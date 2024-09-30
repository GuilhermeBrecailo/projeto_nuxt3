<template>
    <v-card class="mx-auto" color="grey-lighten-3" 
    >
      <v-layout>
        
       <div>
        <NavBarAuth v-if="isAuthenticated" :isAuthenticated="isAuthenticated" @logout="logout"></NavBarAuth>
        <NavBar v-else :isAuthenticated="isAuthenticated" @logout="logout"></NavBar>
       </div>
       
        
       <v-main class="bg-grey-lighten-2">
        <v-container class="bg-grey-lighten-4" >
            <v-row dense>
              <v-col
              >
              <ul>
                
                  <produtos-card
                 v-for="product in products"
                   :key="product.id"
                  :product="product"
                  
                  
                  />
               
              </ul>
              </v-col>
            </v-row>
            
          </v-container>
        </v-main>
      </v-layout>
    </v-card>
  </template>

  <script>

import { fetchProducts } from '~/composables/api';



  export default{

    data(){
      return{
        isAuthenticated: false,
        products: [],
      
      };
    },
    mounted() {
     
     
      const { $supabase } = useNuxtApp()
      $supabase.auth.getSession().then(({ data: {session }}) => {
        this.isAuthenticated = !!session
        console.log(this.isAuthenticated)
        console.log('Session:', session);

      }). catch((error) => {
        console.error('Erro ao obter sessão', error)
      })

      this.loadProducts()
    },
  methods: {

    
    async loadProducts() {
      this.products = await fetchProducts();
      console.log('Produtos carregados',this.products)
    },
    
    logout() {
      const { $supabase } = useNuxtApp();
      $supabase.auth.signOut().then(() => {
        this.isAuthenticated = false;
        this.$router.push('/');
      });
    },
  },
};
</script>