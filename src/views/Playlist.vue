<template>
  <div class="container">
      <loading :active.sync="isloading" 
        :can-cancel="true" 
        :on-cancel="onCancel"
        :is-full-page="fullPage"></loading>
      
      <div class="row">
         <div class="col-md-12 col-12">
           <div class="col-12" ><h2 class="jsonItems">PlayList</h2></div>
            <div class="table-responsive" id="playlist">
               <table class="table">
                  <thead >
                     <tr>
                        <th scope="col-lg-4 col-sm-1"></th>
                        <th scope="col-lg-2 col-sm-1">Canción</th>
                        <th scope="col-lg-2 col-sm-1">Artista</th>
                        <th scope="col-lg-3 col-sm-1">Álbum</th>
                        <th scope="col-lg-2 col-sm-1">D.</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr v-for="data in lista" v-bind:key="data.id">
                       <td><img :src="data.album.cover_small" :alt="data.title"/></td>
                        <th >{{ data.title}}</th>
                        <!--Cambiamos a la dirección que indica el router añadiendo la id del artista  -->
                        <td><router-link v-bind:to="'/artist/'+ data.artist.id">{{ data.artist.name }}</router-link></td>
                        <td>{{ data.album.title }}</td>
                        <!-- cambiamos el formato de los datos recibidos para mostrarlos mm:ss -->
                        <td>{{ data.duration | duration }}</td>
                        
                     </tr>
                  </tbody>
               </table>
 
            </div>
         </div>
      </div>
      
   </div>
   
</template>
<script>

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import * as api from '../api.js';
export default {
  
    name: 'playlist',
   
   components: {
            Loading
            
        },
   data: function (){
      return {
         /*array contenedor de los datos json recibidos de la api */
      lista:[],
      
      /*variables que manejarán la animación de loading */
      isloading: true,
      fullPage: true,
      }
   },
   methods: {
    
      getImage(item){
         return require(item.img);
      },
      /* Esta función utilizará la función contenida en la api insertandole los parametros
      de playlistID, los cuales se obtendrán mediante el router al hacer click en la lista */
      async getPlay(){ 
         
         try{
         this.lista = await api.getPlayList(this.$route.params.playlistID)
         console.log(this.lista)
         this.isloading = false
         }catch(error){
            console.log(error)
            this.isloading= false;
         }
      },
      
       onCancel() {
              
              this.isloading=false
            }
     
  
   },
   created() {
      this.getPlay();
     
      
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
</style>