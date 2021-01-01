<template>
<div class="container" >
      <div class="row">
         <div class="col-md-12 col-12">
           <div class="col-12" ><h2 class="jsonItems">PlayLists</h2></div>
            <div class="table-responsive" id="playlists">
              
               <table class="table">
                  <thead >
                     <tr>
                        <th scope="col-lg-1 col-sm-1"></th>
                        <th scope="col-lg-4 col-sm-1">Nombre</th>
                        <th scope="col-lg-2 col-sm-1">Creador</th>
                        <th scope="col-lg-2 col-sm-1">nb_tracks</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr v-for="data in lista" v-bind:key="data.id">
                       <td><img :src="data.picture_small" /></td>
                        <th><router-link v-bind:to="'/playlist/'+ data.id">{{ data.title}}</router-link></th>
                        <td>{{ data.user.name }}</td>
                        <td>{{ data.nb_tracks }}</td>
                        
                     </tr>
                  </tbody>
               </table>
 
            </div>
         </div>
      </div>
   </div>
  
</template>
<script>
import * as api from '../api.js';
export default {
   name: 'playlists',
    loading: false,
   data: function (){
      return {
      lista:[],
      
      }
   },
   methods: {
      getImage(item) {
         return require(item.img);
      },

      async getPlay(){ 
         this.loading = true
         try{
         this.lista = await api.getPlayLists()
         this.loading = false
         console.log(this.lista)
         }catch(error){
            console.log(error)
            this.loading= false;
         }
      }
   },
   created() {
      this.getPlay();
   }
}


</script>

<style scoped>
  .nav-container{
     margin-top: 20px;
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