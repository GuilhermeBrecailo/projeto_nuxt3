<template>
    <v-app-bar color="blue">
      <a href="/">
        <v-app-bar-title>
          <img
            src="https://i.pinimg.com/736x/81/b8/1b/81b81b38c72e148ce4ddfcae172733f0.jpg"
            alt=""
            width="60px"
            class="border-bottom logo-img rounded-lg"
          />
        </v-app-bar-title>
      </a>
      <v-spacer></v-spacer>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-account" variant="text" v-bind="props"></v-btn>
        </template>
        <v-list>
          <div class="d-flex flex-column">
            <v-btn to="/compras">Minhas compras</v-btn>
            <v-btn to="/meusProdutos">Meus Anuncios</v-btn>
            <v-btn to="/publicar">Anunciar produtos</v-btn>
            <v-btn @click="logout">Sair</v-btn>
          </div>
        </v-list>
      </v-menu>
      
      <v-btn icon="mdi-cart"
      to="/carrinho"
      >
 
  </v-btn>
    </v-app-bar>
  </template>
  
  <script>

  export default {

    props: {
      isAuthenticated: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {
        
        cartItems: [
       
        ], 
     
      };
    },
    methods: {
   
      logout() {
        this.$emit('logout');
        console.log('Usuário deslogado');
        this.$router.push('/login');
      },
    
  
    
    },
  };
  </script>
  
  <style scoped>
  .logo-img {
    margin: 5px;
    margin-top: 10px;
  }
  </style>
  