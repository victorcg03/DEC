window.addEventListener('load', ()=>{
    let opciones = document.querySelectorAll('.opcion');
    opciones.forEach(opcion => {
        opcion.addEventListener('click', (event)=>{
            cronometrar();
            opciones.forEach(opcion=>{
                opcion.classList.toggle('selected');
            })
        });
    }); 
})

    

    /**********************CRONOMETRO***************************/

    //Comienza a cronometrar

    function cronometrar(){
        let horas = 0;

        let minutos = 0;

        let segundos = 0;

        let cronometro = document.getElementById('cronometro');

        crearReloj();

        intervalo = setInterval(crearReloj,1000);

    }

    function crearReloj(){

        let hAux, mAux, sAux;

        segundos++;

        if (segundos>59) {

            minutos++;

            segundos=0;

        }

        if (minutos>59) {

            horas++;

            minutos=0;

        }

        if (horas>24) horas=0;

        if (segundos<10) sAux="0"+segundos;

        else sAux=segundos;

        if (minutos<10) mAux="0"+minutos;

        else mAux=minutos;

        if (horas<10) hAux="0"+horas;

        else hAux=horas;

        cronometro.innerText = hAux + ":" + mAux + ":" + sAux;

    }

    //Detiene el cronometro

    function parar(){

        clearInterval(intervalo);

    }


