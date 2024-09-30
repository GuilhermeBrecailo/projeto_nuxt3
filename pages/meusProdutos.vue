<template>
    <v-app>
        <div>
            <div>
                <NavBarAuth></NavBarAuth>
            </div>
        </div>
        <v-main class="bg-grey-lighten-2">
            <v-container class="bg-grey-lighten-4" >
                
                <h1>Meus produtos</h1>

                <div >
                    <MyProduct />
                </div>
            </v-container>
        </v-main>
    </v-app>
</template>