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
                                    Registre-se
                                </v-card-title>
                                <v-card-text>
                                    <v-form ref="registerForm" v-model="valid">
                                        <v-text-field 
                                            required
                                            outlined
                                            label="User"
                                            v-model="user.username"
                                        ></v-text-field>
                                        <v-text-field 
                                            required
                                            outlined
                                            label="Email"
                                            v-model="user.email"
                                        ></v-text-field>
                                        
                                        <v-text-field 
                                            required
                                            outlined
                                            label="Senha"
                                            type="password"
                                            v-model="user.password"
                                        ></v-text-field>
                                        <v-text-field 
                                            required
                                            outlined
                                            label="Confirmar senha"
                                            type="password"
                                            v-model="confirmPassword"
                                        ></v-text-field>

                                        <v-btn
                                            color="primary"
                                            block
                                            @click="registerUser"
                                        >
                                            Registrar
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

<script>
import { useNuxtApp } from '#app';

export default {
    data() {
        return {
            user: {
                username: '',
                email: '',
                password: ''
            },
            confirmPassword: '',
            valid: false,
            isAuthenticated: false
        };
    },
    mounted() {
        const { $supabase } = useNuxtApp();
        
        $supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                this.isAuthenticated = true;
                console.log("Usuário está autenticado");
            } else {
                this.isAuthenticated = false;
                console.log("Usuário não está autenticado");
            }
        });
    },
    methods: {
        async registerUser() {
            const { $supabase } = useNuxtApp();
            console.log(this.isAuthenticated); 
            const { user, error } = await $supabase.auth.signUp({
                email: this.user.email,
                password: this.user.password,
            });

            if (error) {
                alert(error.message);
            } else {
                alert("Usuário registrado com sucesso!");
               
                const { data, insertError } = await $supabase
                    .from('users')
                    .insert([{ username: this.user.username, email: this.user.email, password: this.user.password}]);

                if (insertError) {
                    alert(insertError.message);
                } else {
                    console.log("Dados do usuário inseridos:", data);
                    this.isAuthenticated = true;
                    this.$router.push('/');
                }
            }
        },
        logout() {
            const { $supabase } = useNuxtApp();
            $supabase.auth.signOut(); 
            this.isAuthenticated = false;
            this.$router.push('/');
        }
    }
};
</script>
