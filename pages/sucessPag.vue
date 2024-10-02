<template>
    <v-app>
        <div>
            <div>
                <NavBarAuth :isAuthenticated="isAuthenticated"></NavBarAuth>
            </div>
        </div>
        <v-main class="bg-grey-lighten-2">
            <v-container class="bg-grey-lighten-4">
                <div >
                    <h1>Pagamento Realizado com sucesso</h1>
                    <p>Aguarde a confirmação da nossa loja no seu e-mail do cadastro</p>

                    <v-btn color="white" class="bg-blue" to="/">
                        Continuar comprando
                    </v-btn>
                    
                </div>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>

const props = defineProps({
  isAuthenticated: {
    type: Boolean,
    required: true,
  },
})

</script>