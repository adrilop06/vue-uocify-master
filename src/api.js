export async function getPlayLists(){ 
  
    let t = await fetch("https://api.deezer.com/chart/0/playlists")
    let r = await t.json()
    return r.data
}

export async function getPlayList(param){ 
    let t = await fetch("https://api.deezer.com/playlist/" + param + "/tracks")
    let r = await t.json()
    return r.data
}

export async function getTrack(param){ 
    let t = await fetch("https://api.deezer.com/search/track?q=" + param)
    let r = await t.json()
    return r.data
}
export async function getAlbums(param){ 
    let t = await fetch("https://api.deezer.com/search/album?q=" + param)
    let r = await t.json()
    return r.data
}
export async function getArtists(param){ 
    let t = await fetch("https://api.deezer.com/search/artist?q=" + param)
    let r = await t.json()
    return r.data
}   
export async function getArtistTop(param){ 
    let t = await fetch("https://api.deezer.com/artist/" + param + "/top")
    let r = await t.json()
    return r.data
}        
export async function getArtistRadio(param){ 
    let t = await fetch("https://api.deezer.com/artist/" + param + "/radio")
    let r = await t.json()
    return r.data
}
export async function getArtistComments(param){ 
    let t = await fetch("https://api.deezer.com/artist/" + param + "/comments")
    let r = await t.json()
    return r.data
}

