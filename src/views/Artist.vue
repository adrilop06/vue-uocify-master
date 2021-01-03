<template>
  <div class="container">
      <loading :active.sync="isloading" 
        :can-cancel="true" 
        :on-cancel="onCancel"
        :is-full-page="fullPage"></loading>
   <div class="col-12" v-for="data in artist.slice(0,1)" v-bind:key="data.id" >
      <h2 class="jsonItems text-center">{{data.artist.name}}</h2>
      <img :src="data.artist.picture_big" :alt="data.title" class="img-artist" />
   </div>
      <div class="row">
         <div class="col-md-12 col-12">
            <div class="table-responsive" id="artist">
               <table class="table">
                  <thead >
                     <tr>
                        <th scope="col-lg-2 col-sm-1"></th>
                        <th scope="col-lg-2 col-sm-1">Canciones</th>
                        <th scope="col-lg-3 col-sm-1">Álbum</th>
                        <th scope="col-lg-2 col-sm-1">D.</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr v-for="data in lista" v-bind:key="data.id">
                        <td><img :src="data.album.cover_small" :alt="data.album.title"/></td>
                        <th>{{data.title}}</th>
                        <th>{{data.album.title}}</th>
                        <th>{{data.duration | duration}}</th>
                        
                        
                     </tr>
                  </tbody>
               </table>
 
            </div>
         </div>
      </div>
      <div class="col-12" style= "margin-top:50px; margin-left:40px;" v-for="data in comments.slice(0,6)" v-bind:key="data.id" >
         
         <b-card class="mb-2 caja" style="max-width: 20rem;">
            <img :src="data.author.picture_small" :alt="data.author.name" class="cards"/>
            <p class="jsonItems text-center">{{data.author.name}}</p>
               <b-card-text>
                  <p class="jsonItems text-center">{{data.text}}</p>
               </b-card-text>
         </b-card>
         
   </div>
   </div>
 
</template>
<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import * as api from '../api.js';
export default {
  
    name: 'artist',
   
   components: {
            Loading
        },
   
   data: function (){
      return {
        comments:[],
        lista:[],
        artist:[],
        isloading: false,
        fullPage: true,
      }
   },
    created() {
      this.callFunctions();
   },
   methods: {
      getImage(item) {
         return require(item.img);
      },

      async getPlay(){ 
         this.isloading = true
         try{
            this.lista = await api.getArtistTop(this.$route.params.artistID)
            console.log(this.lista)
            this.isloading = false
         }catch(error){
            console.log(error)
            this.isloading= false;
            
         }
      },
       async getArtist(){ 
         this.isloading = true
         try{
            this.artist = await api.getArtistRadio(this.$route.params.artistID)
            console.log(this.artist)
            this.isloading = false
         }catch(error){
            console.log(error)
            this.isloading= false;
         }
      },
        async getArtistComment(){ 
         this.isloading = true
         try{
            this.comments = await api.getArtistComments(this.$route.params.artistID)
            console.log(this.comments)
            this.isloading = false
         }catch(error){
            console.log(error)
            this.isloading= false;
         }
      }, 
         callFunctions(){
               this.getPlay();
               this.getArtist()
               this.getArtistComment()
               
         },
       onCancel() {
              console.log('User cancelled the loader.'),
              this.isloading=false
            }
     
  
   },
  
}
</script>
<style scoped>
  .container{
     margin-top: 150px;
      width: 100%;
      height: 100%;
      background-color: white;
  }
  .img-album {
    height: 130px;
    width: auto;
    display: block;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid #a09898;
  }
  .title-album {
    font-family: 'Spartan', sans-serif;
    font-weight: 400;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-top: 15px;
    text-align: center; 
  }
  .tracks-album{
    color: #838383; 
    font-family: 'Spartan', sans-serif;
    font-weight: 400;
    text-align: left;
  }
  .table{
    margin-top: 20px;
  }
 .jsonItems{
    font-weight: bold;
    margin-left:20px;
    margin-bottom: 20px;
    margin-top:20px;
}
   .img-artist{
      max-width: 100%;
      height: auto;
      margin-bottom: 10px;
      display: block;
      margin-left: auto;
      margin-right: auto;
   }
   .cards{
      display: block;
      margin-left: auto;
      margin-right: auto;
      border-radius: 50%;
         
   }
   
   .caja{
      display: flex;
      float:left;
      width: 300px;
      height: 450px;
      margin-right: 50px;
      margin-top:25px;
      
   }
</style>