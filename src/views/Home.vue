<template>
    <main class="page-home">
        <div class="container"  v-if="this.isLogged==true">
            <img class="logo" src="@/assets/icon.svg" alt="logo">
            <h1 class="main-title">¿En busca de música?</h1>
            <p class="lorem-textum">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tellus arcu, feugiat eu molestie in, finibus sit amet lorem. Phasellus consectetur ipsum in imperdiet ultrices. </p>
            <playlists></playlists>
        </div>
            
        <div v-else>
            <img class="logo" src="@/assets/icon.svg" alt="logo">
            <h1 class="main-title">¿En busca de música?</h1>
            <p class="lorem-textum">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tellus arcu, feugiat eu molestie in, finibus sit amet lorem. Phasellus consectetur ipsum in imperdiet ultrices. </p>
            
        </div>
    </main>
</template>

<script>
import Playlists from '../components/Playlists.vue'
import firebase from 'firebase'
    export default {
        components: {Playlists},
        name:'Home',
       data(){
        return{
            isLogged:false,
        }
        }, 

        created(){
            this.IsLoggedIn();
        },
        methods:{
               async IsLoggedIn() {
            try {
                await new Promise((resolve, reject) =>
                firebase.auth().onAuthStateChanged(
                user => {
                    if (user) {
                    this.isLogged = true
                     console.log("yes")
                     } else {
                    this.isLogged = false
                    reject('There is no user');
                    }
                    },
                        // Prevent console errors
                        error => reject(error)
                    )
                    )
                    return true
                    } catch (error) {
                    return false
                    }
}
        }
    }
</script>


<style lang="scss">
    .page-home{
        text-align: center;
        padding-left:30px;
        padding-right:30px;

        .logo{
            width: 200px;
            margin-top: 35px;
            margin-bottom: 35px;
        }

        
    }
</style>