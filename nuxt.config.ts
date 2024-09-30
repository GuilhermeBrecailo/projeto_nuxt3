
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['vuetify-nuxt-module', ],
  vuetify :{
    theme: {
      defaultTheme: 'light'
    }
  },
  runtimeConfig: {
    public: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY
    }
  },

  buildModules: [
    '@nuxtjs/vuetify',
  ],
  
  
 

 
})