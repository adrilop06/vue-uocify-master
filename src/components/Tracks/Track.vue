<template>
    <tr class="track">
        <td class="track-cover">
            <img :src="track.album.cover_small" :alt="track.title">
        </td>
        <td class="track-title">
            {{track.title}}
        </td>
        <td class="track-artist">
            <!-- Redirigimos al usuario al hacer click hacia la página artist.vue -->
            <!-- Para ello usamos la dirección creada en el router y el id del artista -->
             <router-link v-bind:to="'/artist/'+ track.artist.id">{{track.artist.name}}</router-link>
        </td>
        <td class="track-album">
            {{track.album.title}}
        </td>
        <td class="track-duration">
            <!-- empleamos el filtro duration para convertir las cifras en formato mm:ss -->
            {{track.duration | duration }}
        </td>                                
    </tr>
</template>

<script>
export default {
  methods: {
  },
    name: 'Track',
    props: { 
        track: Object, 
    },
    
}
</script>

<style lang="scss">
    
	.track{
		cursor: pointer;
		transition: all 0.2s linear;
		&:hover{
			background-color: $bg-color;
		}
	}

    .track-album{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;        
    }

    .track-duration{
        color: $grey-label;
        text-align: right;
    }    

    .track-cover img {
        width: 35px;
        height: auto;
        border-radius: 4px;
    }

    @media #{$min-sm} {
        .track-title{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;        
        }
    }    

    @media #{$max-md} {
        .track{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            padding-top: 7px;
            padding-bottom: 7px;
            border-bottom: 1px solid $border-color;
        }

        .track-cover{
           display: none;
        }

        .track-title { 
            font-size: 13px;
            flex-grow: 1;
            font-weight: 600;
            width: 60%;
        }	

        .track-duration {
            flex-shrink: 1;
            order:1;
            margin-left: 3px;
            font-size: 12px;
        }	

        .track-artist {
            font-size: 12px;
            order: 1;
            flex-grow: 1;
        }	

        .track-album { 
            font-size: 12px;
            flex-grow: 1;
            width: 60%;
        }
    }    
</style>
