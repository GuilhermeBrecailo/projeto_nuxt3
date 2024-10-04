<template>
   <v-app-bar
          color="blue"
          
        >
  
          <a href="/">

            <v-app-bar-title>
              <img src="https://i.pinimg.com/736x/81/b8/1b/81b81b38c72e148ce4ddfcae172733f0.jpg" 
              alt=""
               width="60px"
               class="border-bottom logo-img rounded-lg"
               >
            </v-app-bar-title>
            
          </a>
          <v-spacer></v-spacer>
  
          <!-- <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn> -->
       
          <v-btn to="/login">
            Login
          </v-btn>
          <v-btn to="/register">
            Registre-se
          </v-btn>
        </v-app-bar>
</template>

<style scoped>
.logo-img {
  margin: 5px;
  margin-top: 10px;

}
</style>

<script>


export default{


  
  props: {
    isAuthenticated: {
      type: Boolean,
      Required: true
    }
  },
  methods: {
    logout(){
      this.$emit('logout')
      console.log(this.logout)
    }
  }
}
</script>
