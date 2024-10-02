<template>


        <div class="bottom-bar">
          <div class="content">
            <p class="footer-text">&copy; 2024 Sua Empresa. Todos os direitos reservados.</p>
            <div class="button-group">
              <v-btn text href="/sobre">Sobre</v-btn>
              <v-btn text href="/contato">Contato</v-btn>
              <v-btn text href="/privacidade">Política de Privacidade</v-btn>
              <v-btn icon @click="scrollToTop">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
      

</template>

<script>

export default {
  
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  };
    </script>

<style scoped>
.bottom-bar {
  background-color: #ffffff;
  color: #000000;
  padding: 0.5em 0; 
  width: 100%; 
  z-index: 1000; 
  display: flex; 
  justify-content: space-between; 
  align-items: center;
  margin-top: auto; 
}

.footer-text {
  margin: 0; 
  font-size: 0.7em; 
}

.button-group {
  display: flex; 
}

.button-group > * {
  font-size: 0.7em; 
  margin-left: 10rem; 
}


</style>
