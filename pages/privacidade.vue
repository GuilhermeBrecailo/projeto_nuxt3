<template>
    <v-app>
      <div>
        <NavBarAuth v-if="isAuthenticated" :isAuthenticated="isAuthenticated" @logout="logout"></NavBarAuth>
        <NavBar v-else :isAuthenticated="isAuthenticated" @logout="logout"></NavBar>
      </div>
      <v-main class="bg-grey-lighten-2">
        <v-container class="bg-grey-lighten-4">
          <h1>Política de Privacidade</h1>
          <p>
            Esta política descreve como coletamos, usamos e protegemos suas informações pessoais. 
            Estamos comprometidos em garantir que sua privacidade seja protegida.
          </p>
          <p>
            Quando solicitamos que você forneça informações pessoais, podemos garantir que essas informações serão usadas 
            de acordo com esta declaração de privacidade.
          </p>
          <p>
            Podemos alterar esta política de tempos em tempos, atualizando esta página.
          </p>
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
    name: 'Privacidade',
  };
  </script>
  
  <style scoped>
  h1 {
    margin-bottom: 20px;
  }
  </style>
  