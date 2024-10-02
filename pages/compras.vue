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
                    <h1>Sem itens no momento</h1>
                    <p>Assim que confirmarmos, notificaremos e aparecerão os produtos que você comprou!</p>

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