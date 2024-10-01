export default function ({store, redirect, route}){
    if(!store.state.auth.isAuthenticated){
        if (route.path !== '/' && route.path !== '/login' && route.path !== '/register'){
            return redirect('/login')
        }
        console.log('Voce precisa estar logado para acessar esta pagina.')
    }
}