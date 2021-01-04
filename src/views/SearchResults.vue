<template>
    <div  v-if="isLogged==true">
    <main class="page-search">
        <loading :active.sync="isloading" 
        :can-cancel="true" 
        :on-cancel="onCancel"
        :is-full-page="fullPage"></loading>
        <h1 class="main-title">Resultados de <span>{{query}}</span></h1>
        <b-tabs>
            <b-tab id="tabAll" title="Todo" active>
                <h2 class="title">Canciones <fa-icon icon="chevron-right" class="icon" /></h2>
                <track-list :tracks="tracks.slice(0,6)" />

                <h2 class="title">Álbumes <fa-icon icon="chevron-right" class="icon" /></h2>
                <album-list :albums="albums.slice(0,6)" />

                <h2 class="title">Artistas <fa-icon icon="chevron-right" class="icon" /></h2>
                <artist-list :artists="artists.slice(0,6)" />                

            </b-tab>            
            <b-tab id="tabTracks" title="Canciones">
                <h2 class="title">{{this.tracks.length}} canciones</h2>
                <track-list :tracks="tracks" />
            </b-tab>
            <b-tab id="tabAlbums" title="Álbumes">
                <h2 class="title">{{this.albums.length}} álbumes</h2>
                <album-list :albums="albums" />
            </b-tab>            
            <b-tab id="tabArtists" title="Artistas">
                <h2 class="title">{{this.artists.length}} artistas</h2>
                <artist-list :artists="artists" />
            </b-tab>
        </b-tabs>
    </main>
    </div>
    <div v-else>
        <main class="page-home">
         <div class="container">
            <img class="logo" src="@/assets/icon.svg" alt="logo">
            <h1 class="main-title">¿Aún no estás registrado?</h1>
            <p class="lorem-textum">¡No pierdas más tiempo y regístrate!</p>
        </div>
        </main>
    </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import TrackList from '@/components/Tracks/TrackList'
import AlbumList from '@/components/Albums/AlbumList'
import ArtistList from '@/components/Artists/ArtistList'
import * as api from '../api.js'
import firebase from 'firebase';

export default {
    name:'SearchResults',
    components:{ AlbumList, ArtistList, TrackList,Loading },
   
    data(){
        return{
            /* valores qeu usaremos como variables:
            tracks, album y artists son los contenedores de los archivos json recibidos al llamar a la api.*/
            tracks: [],
            albums: [],
            artists: [],
            /*isloading es una variable creada para saber si se ha cargado el contenido de la api. Esto
            nos permite hacer funcionar una animación de loading para que el usuario sepa 
            que se esta cargando el contenido. fullPage nos sirve para que dicha animación ocupe toda la página*/
            isloading: false,
            fullPage: true,
            /*isLogged es creada para almacenar si el usuario está logeado o no. De esta manera podemos bloquear
            ciertas funciones que solo se muestran cuando estas login*/
            isLogged:false,
            /*obtenemos el valor de la consulta en el buscador*/
            query: this.$route.params.q || ''
        }
    }, 
    watch: {
        '$route.params.q': function (q) {
            this.query=q; 
            this.search() 
        },
        
        
    },
    created(){
        this.search();
    },
     methods:{
         /*Estas funciones insertan el valor de la consulta en la función que realiza la llamada
            , la cual se encuentra en api.js. Estas funciones son async dado que debemos esperar
            que el contenido se carge para que se ejecuten*/
        async updateTracks(){ 
            this.isLoading = true
            try{
                this.tracks = await api.getTrack(this.query)
                this.isLoading = false
                
            }catch(error){
                    console.log(error)
                    this.isLoading = false
            }
        },
         async updateAlbums(){ 
             this.isLoading = true
            try{
                this.albums = await api.getAlbums(this.query)
                this.isLoading = false
            }catch(error){
                    console.log(error)
                    this.isLoading = false
            }
        },
         async updateArtists(){ 
             this.isLoading = true
            try{
                this.artists = await api.getArtists(this.query)
                this.isLoading = false 
            }catch(error){
                    console.log(error)
                    this.isLoading = false
            }
        },
        /*Llamamos a todas las funciones desde una sola, de esta manera ejecutamos todas a la vez */
        async search(){
            this.IsLoggedIn(); 
            this.updateTracks();
            this.updateAlbums();
            this.updateArtists();   
        },
        /*Nos sirve para cancelar la carga de datos si el usuario pulsa la pantalla */
        onCancel() {
              
              this.isloading=false
        },
        /*Llamamos a firebase para que compuebe si el usuario esta logeado.En este caso cambiamos
        el valor de la variable*/
        async IsLoggedIn() {
            try {
                await new Promise((resolve, reject) =>
                firebase.auth().onAuthStateChanged(
                user => {
                    if (user) {
                    this.isLogged = true
                     console.log("User is logged")
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


<style lang="scss" >
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
    .page-search{
        display: flex;
        flex-direction: column;
        height: 100%;

        .main-title {
            margin-bottom: 20px;

            span{
                color: $grey-label;
            }
        }

        .tabs{
            background: white;
            flex: 1;
            height: 100%;
        }

        #tabAll{
            .title{
                font-size: 18px;

                .icon{
                    font-size: 14px;
                    margin-left: 3px;
                }
            }

            .track-list{
                margin-bottom: 30px;
                thead{
                    display: none;
                }
            }

            section{
                margin-bottom: 30px;
            }
        }
    }


</style>