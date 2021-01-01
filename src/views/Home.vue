<template>
    <main class="page-home">
        <div class="container">
            <img class="logo" src="@/assets/icon.svg" alt="logo">
            <h1 class="main-title">¿En busca de música?</h1>
            <p class="lorem-textum">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tellus arcu, feugiat eu molestie in, finibus sit amet lorem. Phasellus consectetur ipsum in imperdiet ultrices. </p>
            <playlists></playlists>
        </div>
    </main>
</template>

<script>
import Playlists from '../components/Playlists.vue'
    export default {
        components: {Playlists},
        name:'Home',
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