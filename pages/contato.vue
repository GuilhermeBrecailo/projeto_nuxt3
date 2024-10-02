<template>
    <v-app>
      <div>
        <NavBarAuth v-if="isAuthenticated" :isAuthenticated="isAuthenticated" @logout="logout"></NavBarAuth>
        <NavBar v-else :isAuthenticated="isAuthenticated" @logout="logout"></NavBar>
      </div>
      <v-main class="bg-grey-lighten-2">
        <v-container class="bg-grey-lighten-4">
          <h1>Contato</h1>
          <p>Confira nosso projeto no GitHub!</p>
          <v-btn 
            class="bg-blue" 
            href="https://github.com/GuilhermeBrecailo/projeto_nuxt3.git" 
            target="_blank"
            icon
          >
            <v-icon>mdi-github</v-icon>
          </v-btn>
          <div><br></div>
          <v-form>
            <v-text-field label="Seu E-mail para promoções" required v-model="email"></v-text-field>
            <v-btn class="bg-blue" @click="sendEmail">
              Enviar
            </v-btn>
          </v-form>
          
          <br>
          <v-btn class="bg-blue" to="/">
            Voltar
          </v-btn>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  export default {
    name: 'Contato',
    data() {
      return {
        email: '',
      };
    },
    methods: {
      sendEmail() {
        // Aqui você pode adicionar a lógica para enviar o email
        alert('Email enviado: ' + this.email);
        this.email = ''; // Limpa o campo após enviar
      },
    },
  };
  </script>
  
  <style scoped>
  h1 {
    margin-bottom: 20px;
  }
  </style>
  