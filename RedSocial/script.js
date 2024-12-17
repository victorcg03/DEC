window.addEventListener('load', async ()=>{
    const usuariosURL = "https://jsonplaceholder.typicode.com/users";
    const datosUsuarios = await (await fetch(usuariosURL)).json();
    const selectUsuarios = document.getElementById("usuarios");
    const posts = document.getElementById("posts");
    const albums = document.getElementById("albumes");
    const fotos = document.getElementById("fotos");
    const ventanaFoto = document.getElementById("fotoGrande");
    datosUsuarios.forEach(usuario => {
        selectUsuarios.innerHTML += `<option value="${usuario.id}">${usuario.name}</option>`
    });
    selectUsuarios.addEventListener('change', async ()=>{
        const usuarioSeleccionado = datosUsuarios.filter(usuario => usuario.id == selectUsuarios.value)[0];
        const infoUsuario = document.getElementById("info");
        infoUsuario.classList.add("cargando");
        posts.classList.add("oculto");
        albums.classList.add("oculto");
        fotos.classList.add("oculto");
        if (!usuarioSeleccionado) {
            infoUsuario.classList.add("oculto");
        }else{
            const nombreUsuario = usuarioSeleccionado.name;
            const lat = usuarioSeleccionado.address.geo.lat;
            const lng = usuarioSeleccionado.address.geo.lng;
            const edadURL = `https://api.agify.io/?name=${nombreUsuario}`;
            const generoURL = `https://api.genderize.io/?name=${nombreUsuario}`;
            
            const idUsuario = usuarioSeleccionado.id;
            const edadUsuario = (await (await fetch(edadURL)).json()).age;
            const generoUsuario = (await (await fetch(generoURL)).json()).gender;
            const ciudadUsuario = await obtenerCiudad(lat, lng);
            const mailUsuario = usuarioSeleccionado.email;
            const webUsuario = usuarioSeleccionado.website;            
            
            infoUsuario.innerHTML = fichaUsuario(idUsuario, generoUsuario, nombreUsuario, edadUsuario, mailUsuario, ciudadUsuario, webUsuario);
            infoUsuario.classList.remove("cargando");
            infoUsuario.classList.remove("oculto");
            document.querySelector(".posts").addEventListener("click", mostrarPosts);
            document.querySelector(".fotos").addEventListener("click", mostrarAlbums);
        }
    });
    async function mostrarPosts(event){
        const idUsuario = event.target.dataset.id;
        const postsUsuario = await (await fetch(`${usuariosURL}/${idUsuario}/posts`)).json();
        albums.classList.add("oculto");
        fotos.classList.add("oculto");
        posts.classList.remove("oculto");
        posts.innerHTML = "";
        postsUsuario.forEach(post=>{
            posts.innerHTML += `
                <div class="post">
                    <div class="titular">${post.title}</div>
                    <div class="cuerpo">${post.body}</div>
                </div>`
        });
    }
    async function mostrarAlbums(event){
        const idUsuario = event.target.dataset.id;
        const albumsUsuario = await (await fetch(`${usuariosURL}/${idUsuario}/albums`)).json();
        posts.classList.add("oculto");
        albums.classList.remove("oculto");
        albums.innerHTML = "";
        albumsUsuario.forEach(album=>{
            albums.innerHTML += `
                <a class="album" id="${album.id}">${album.title}</a>
                `
        });
        document.querySelectorAll("a").forEach(enlace => enlace.addEventListener("click", mostrarAlbum));
    }
    async function mostrarAlbum(event){
        const albumID = event.target.id;
        const fotosAlbum = await (await fetch(`https://jsonplaceholder.typicode.com/albums/${albumID}/photos`)).json();
        fotos.classList.remove("oculto");
        fotos.classList.add("cargando");
        fotos.innerHTML = "";
        fotosAlbum.forEach(foto=>{
            fotos.innerHTML += `
                <img class="foto" src="${foto.thumbnailUrl}" id="${foto.id}"></img>
                `
        });
        fotos.classList.remove("cargando");
        document.querySelectorAll("#fotos img").forEach(foto => foto.addEventListener("click", verFotoGrande));
    }
    async function verFotoGrande(event){
        const fotoID = event.target.id;
        const fotoGrande = (await (await fetch(`https://jsonplaceholder.typicode.com/photos/${fotoID}`)).json()).url;
        ventanaFoto.classList.remove("oculto"),
        ventanaFoto.querySelector("img").src = fotoGrande;
        document.querySelector("header").scrollIntoView({ behavior: 'smooth' });
        document.querySelector("main").addEventListener("click", cerrarFoto);
        document.querySelector("header").addEventListener("click", cerrarFoto);
        ventanaFoto.querySelector("span").addEventListener("click", cerrarFoto);
    }
    function cerrarFoto(){
        ventanaFoto.classList.add("oculto");
    }
});
async function obtenerCiudad(lat, lng){
    const ciudadURL = `https://geocode.xyz/${lat},${lng}?json=1&auth=695531246444246709019x40401`;
    const dataBruto = (await (await fetch(ciudadURL)).json()).suggestion;
    
    return dataBruto.south.city.length ? dataBruto.south.city : dataBruto.north.city;
}

const fichaUsuario = (id, genero, nombre, edad, mail, ciudad, web)=>{
    return  `
            <div class="foto">
                <img src="./${genero}.png">
            </div>
            <div class="info">
                <div class="info-row">
                    <div class="titulo">Nombre</div>
                    <div class="descripcion">${nombre}</div>
                </div>
                <div class="info-row">
                    <div class="titulo">Edad</div>
                    <div class="descripcion">${edad ? edad + " años": "Desconocida"}</div>
                </div>
                <div class="info-row">
                    <div class="titulo">Email</div>
                    <div class="descripcion">
                        <a href="mailto:${mail}">${mail}</a>
                    </div>
                </div>
                <div class="info-row">
                    <div class="titulo">Ciudad</div>
                    <div class="descripcion">${ciudad}</div>
                </div>
                <div class="info-row">
                    <div class="titulo">Web</div>
                    <div class="descripcion">
                        <a target="_blank" href="http://${web}">${web}</a>
                    </div>
                </div>
                <div class="buttons info-row">
                    <button data-id="${id}" class="posts">Posts</button>
                    <button data-id="${id}" class="fotos">Fotos</button>
                </div>
            </div>
            `;
}