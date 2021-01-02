<template>
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
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import TrackList from '@/components/Tracks/TrackList'
import AlbumList from '@/components/Albums/AlbumList'
import ArtistList from '@/components/Artists/ArtistList'
import * as api from '../api.js'

export default {
    name:'SearchResults',
    components:{ AlbumList, ArtistList, TrackList,Loading },
   
    data(){
        return{
            tracks: [],
            albums: [],
            artists: [],
            isloading: false,
            fullPage: true,
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
        async search(){
            this.updateTracks();
            this.updateAlbums();
            this.updateArtists();   
        },
        onCancel() {
              console.log('User cancelled the loader.')
              this.isloading=false
        },
        
    }
     
   
}
</script>


<style lang="scss" >

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