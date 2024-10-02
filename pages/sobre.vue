<template>
    <v-app>
        <div>
        <NavBarAuth v-if="isAuthenticated" :isAuthenticated="isAuthenticated" @logout="logout"></NavBarAuth>
        <NavBar v-else :isAuthenticated="isAuthenticated" @logout="logout"></NavBar>
       </div>
        <v-main class="bg-grey-lighten-2">
            <v-container class="bg-grey-lighten-4" >
            <h1>Sobre Nós</h1>
            <p>
                Nossa empresa é dedicada a oferecer os melhores produtos e serviços para nossos clientes. 
                Estamos comprometidos com a qualidade e a satisfação do cliente.
            </p>
            <p>
                Fundada em 2024, temos uma equipe de profissionais experientes prontos para atender suas necessidades.
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
    name: 'Sobre',
  };
  </script>
  
  <style scoped>
  h1 {
    margin-bottom: 20px;
  }
  </style>
  