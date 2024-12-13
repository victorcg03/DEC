window.addEventListener('load', ()=>{
    let peticionNumDistritos = new XMLHttpRequest();
    peticionNumDistritos.addEventListener("readystatechange", gestionarPeticionNumDistritos);
    peticionNumDistritos.open("GET", "https://valencia.opendatasoft.com/api/explore/v2.1/catalog/datasets/precio-de-compra-en-idealista/records", true);
    peticionNumDistritos.send(null);
    function gestionarPeticionNumDistritos(){
        if(peticionNumDistritos.readyState == 4 && peticionNumDistritos.status == 200){
            let numDistritos = JSON.parse(peticionNumDistritos.responseText).total_count;
            let peticionDistritos = new XMLHttpRequest();
            peticionDistritos.addEventListener("readystatechange", gestionarPeticionDistritos);
            peticionDistritos.open("GET", `https://valencia.opendatasoft.com/api/explore/v2.1/catalog/datasets/precio-de-compra-en-idealista/records?order_by=distrito%2C%20barrio&limit=${numDistritos}`, true);
            peticionDistritos.send(null);
            function gestionarPeticionDistritos() {
                if(peticionDistritos.readyState == 4 && peticionDistritos.status == 200){
                    let data = JSON.parse(peticionDistritos.responseText);
                    let distritoAnterior = null;
                    data.results.forEach(resultado =>{
                        if (distritoAnterior == null || distritoAnterior != resultado.distrito) {
                            idealista.innerHTML += `<details id="distrito${resultado.coddistrit}"><summary>${resultado.distrito}</summary></details>`;
                        }
                        let precio2022 = resultado.precio_2022_euros_m2;
                        let precio2010 = resultado.precio_2010_euros_m2;
                        let precioMaximoHistorico = resultado.max_historico_euros_m2;
                        let fechaPrecioMaximoHistorico = resultado.ano_max_hist;
                        idealista.querySelector(`#distrito${resultado.coddistrit}`).innerHTML+=`
                                        <details><summary>${resultado.barrio}</summary>
                                            <ul>
                                                <li>Precio metro cuadrado 2022: ${precio2022 != null ? precio2022 + "€": "No disponible"}</li>
                                                <li>Precio metro cuadrado 2010: ${precio2010 != null ? precio2010 + "€": "No disponible"} ${haSubidoPrecio(resultado.precio_2022_euros_m2, resultado.precio_2010_euros_m2)}</li>
                                                <li>Precio máximo histórico: ${precioMaximoHistorico != null ? precioMaximoHistorico + "€" + " en el año " + fechaPrecioMaximoHistorico : "No disponible"}</li>
                                            </ul>
                                        </details>`;
                        distritoAnterior = resultado.distrito;
                    });
                }
            }
        }
    }
    //FOTOCASA
    let peticionNumDistritosFotocasa = new XMLHttpRequest();
    peticionNumDistritosFotocasa.addEventListener("readystatechange", gestionarPeticionNumDistritosFotocasa);
    peticionNumDistritosFotocasa.open("GET", "https://valencia.opendatasoft.com/api/explore/v2.1/catalog/datasets/precio-de-compra-en-fotocasa/records", true);
    peticionNumDistritosFotocasa.send(null);
    function gestionarPeticionNumDistritosFotocasa(){
        if(peticionNumDistritosFotocasa.readyState == 4 && peticionNumDistritosFotocasa.status == 200){
            let numDistritosFotocasa = JSON.parse(peticionNumDistritosFotocasa.responseText).total_count;
            let peticionDistritosFotocasa = new XMLHttpRequest();
            peticionDistritosFotocasa.addEventListener("readystatechange", gestionarPeticionDistritosFotocasa);
            peticionDistritosFotocasa.open("GET", `https://valencia.opendatasoft.com/api/explore/v2.1/catalog/datasets/precio-de-compra-en-fotocasa/records?order_by=distrito%2C%20barrio&limit=${numDistritosFotocasa}`, true);
            peticionDistritosFotocasa.send(null);
            function gestionarPeticionDistritosFotocasa() {
                if(peticionDistritosFotocasa.readyState == 4 && peticionDistritosFotocasa.status == 200){
                    let data = JSON.parse(peticionDistritosFotocasa.responseText);
                    let distritoAnterior = null;
                    data.results.forEach(resultado =>{
                        if (distritoAnterior == null || distritoAnterior != resultado.distrito) {
                            fotocasa.innerHTML += `<details id="distrito${resultado.coddistrit}"><summary>${resultado.distrito}</summary></details>`;
                        }
                        let precio2022 = resultado.precio_2022_euros_m2;
                        let precio2010 = resultado.precio_2010_euros_m2;
                        let precioMaximoHistorico = resultado.max_historico_euros_m2;
                        let fechaPrecioMaximoHistorico = resultado.ano_max_hist;
                        fotocasa.querySelector(`#distrito${resultado.coddistrit}`).innerHTML+=`
                                        <details><summary>${resultado.barrio}</summary>
                                            <ul>
                                                <li>Precio metro cuadrado 2022: ${precio2022 != null ? precio2022 + "€": "No disponible"}</li>
                                                <li>Precio metro cuadrado 2010: ${precio2010 != null ? precio2010 + "€": "No disponible"} ${haSubidoPrecio(resultado.precio_2022_euros_m2, resultado.precio_2010_euros_m2)}</li>
                                                <li>Precio máximo histórico: ${precioMaximoHistorico != null ? precioMaximoHistorico + "€" + " en el año " + fechaPrecioMaximoHistorico : "No disponible"}</li>
                                            </ul>
                                        </details>`;
                        distritoAnterior = resultado.distrito;
                    });
                }
            }
        }
    }

});
function haSubidoPrecio(precio2022, precio2010){
    if (precio2022 == null || precio2010 == null) {
        return "";
    }
    if (precio2022 > precio2010) {
        return `<i class="fa-solid fa-arrow-up"></i>`;
    }
    if (precio2022 < precio2010) {
        return `<i class="fa-solid fa-arrow-down"></i>`;
    }
    if (precio2022 == precio2010) {
        return `<i class="fa-solid fa-equals"></i>`;
    }
}