<template>
    <v-app>
        <div>
            <div>
                <navBar></navBar>
            </div>
            <v-main>
                <v-container>
                    <v-row justify="center">
                        <v-col cols="12" md="6">
                            <v-card class="pa-4" outlined>
                                <v-card-title class="text-h5 text-center">
                                    Login
                                </v-card-title>
                                <v-card-text>
                                    <v-form ref="loginForm" v-model="valid">
                                        <v-text-field 
                                            required
                                            outlined
                                            label="Email"
                                            v-model="email"
                                            :rules="emailRule"
                                        ></v-text-field>
                                        
                                        <v-text-field 
                                            required
                                            outlined
                                            v-model="password"
                                            label="Senha"
                                            type="password"
                                            :rules="passwordRules"
                                        ></v-text-field>

                                        <v-btn
                                            color="primary"
                                            block
                                            @click="login"
                                        >
                                            Entrar
                                        </v-btn>
                                    </v-form>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-main>
        </div>
    </v-app>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; 
import { useNuxtApp } from '#app';

const { $supabase } = useNuxtApp();
const email = ref('');
const password = ref('');
const valid = ref(false);
const isAuthenticated = ref(false); 

const emailRule = [
    (v) => !!v || 'Email necessário',
    (v) => /.+@.+\..+/.test(v) || 'Email deve ser válido'
];
const passwordRules = [
    (v) => !!v || 'Senha necessária'
];

const router = useRouter(); // fui testar e funcionou, antes nao precisava kkk vai saber

async function login() {
    const { error } = await $supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
    });

    if (error) {
        alert('Login falhou: ' + error.message);
    } else {
        alert('Usuário logado');
        const { data: { user }, error: userError } = await $supabase.auth.getUser();

        if (userError) {
            console.error('Error getting user:', userError);
            return; 
        }

        console.log(user);
        isAuthenticated.value = true; 
        console.log('Is Authenticated:', isAuthenticated.value);
        
        router.push('/'); 
    }
}
</script>
