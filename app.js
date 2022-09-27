document.addEventListener('DOMContentLoaded', () => {

// Constante de cada carta del juego (Cada imagen que esta en la matriz del juego)
const imagenArray = [
    {   nombre: 'minion-bob-corazon',
        img: 'images/minion-bob-corazon.jpg'
    },
    {   nombre: 'minion-bob-corazon',
        img: 'images/minion-bob-corazon.jpg'
    },
    {   nombre: 'minion-bob-peluche',
        img: 'images/2.jpg'
    },
    {   nombre: 'minion-bob-peluche',
        img: 'images/2.jpg'
    },
    {   nombre: 'minion-bob-rey',
        img: 'images/3.jpg'
    },
    {   nombre: 'minion-bob-rey',
        img: 'images/3.jpg'
    },
    {   nombre: 'minion-stuart-saltando',
        img: 'images/4.jpg'
    },
    {   nombre: 'minion-stuart-saltando',
        img: 'images/4.jpg'
    },
    {   nombre: 'minion-kevin-abrigado',
        img: 'images/5.jpg'
    },
    {   nombre: 'minion-kevin-abrigado',
        img: 'images/5.jpg'
    },
    {   nombre: 'minion-kevin-banana',
        img: 'images/6.jpg'
    },    
    {   nombre: 'minion-kevin-banana',
        img: 'images/6.jpg'
    }
]

// CRONOMETRO - Gaurda Tiempo desde el inicio en HH:MM:SS
window.onload = init;

function init(){ //Botones de cronometro
    document.querySelector(".start").addEventListener("click",cronometrar);
    // document.querySelector(".stop").addEventListener("click",parar);
    document.querySelector(".reiniciar").addEventListener("click",reiniciar);
    h = 0;
    m = 0;
    s = 0;
    document.getElementById("hms").innerHTML="00:00:00";
}         
function cronometrar(){
    crearTablero();//Al darle Iniciar juego abre el tablero y escribir, que comienza el cronometro
    escribir();
    id = setInterval(escribir,1000);
    document.querySelector(".start").removeEventListener("click",cronometrar);
}
function escribir(){ // El cronometro en si
    let hAux, mAux, sAux;
    s++;
    if (s>59){m++;s=0;}
    if (m>59){h++;m=0;}
    if (h>24){h=0;}

    if (s<10){sAux="0"+s;}else{sAux=s;}
    if (m<10){mAux="0"+m;}else{mAux=m;}
    if (h<10){hAux="0"+h;}else{hAux=h;}

    document.getElementById("hms").innerHTML = hAux + ":" + mAux + ":" + sAux; 
}


// let open = document.getElementById('open');
// let modal_container2 = document.getElementById('modal_container2');
// let close = document.getElementById('close');

// open.addEventListener('click', () => {
//   modal_container2.classList.add('show');  
// });

// close.addEventListener('click', () => {
//   modal_container2.classList.remove('show');
// });

let btnMostrarRegistros = document.getElementById("verRegistros")
btnMostrarRegistros.addEventListener("click",()=>{
    mostrarRegistros(storageUsers)
    
})

function parar(){ //Frena el cronometro y despliega ingreso del usuario
    clearInterval(id)
    document.querySelector(".start").addEventListener("click",cronometrar);
    tablero.innerHTML = `<input type="button" value="Actualizar" onclick="location.reload()"/>`
//     let registroDeUsuario = document.getElementById("registroDeUsuario")
//     registroDeUsuario.innerHTML = `
// <form>
//     <input type="text" id="usuarioNew" name="titulo">
//     <button id="btnGuardar" class="btn btn-success">Guardar Usuario</button>
// </form>`
}


function reiniciar(){
    document.getElementById("hms").innerHTML="00:00:00";
    h=0;m=0;s=0;
    document.querySelector(".start").addEventListener("click",cronometrar);
}


//ARRAY DE LAS IMAGENES ORDENADO CON SORT Y CON MATH EN RANDOM PARA EL ALETORIO
imagenArray.sort(() => 0.7 - Math.random())

//TABLERO DE JUEGO CON QUERY SELECTOR
const tablero = document.querySelector('#tableroJuego')

//RESULTADO ARRIBA DEL TABLERO CON QUERY SELECTOR
const resuladoDisplay = document.querySelector('#result')

// DECLARACION DE VARIABLES
let imagenElegida = []
let imagenID = []
let ImagenGanadora = []

//TABLERO DEL JUEGO CON LA IMAGEN BASE ANTES DE SELECCIOANRLA
function crearTablero() {
    for (let i = 0; i < imagenArray.length; i++) { //Agrega una a la lista del Array
    const imagenM = document.createElement('img') //Constante de imagen base
    imagenM.setAttribute('src', 'images/frente.jpg') // Variable de asignacion de imagen
    imagenM.setAttribute('ID', i) // Variable del ID 

    //Al hacer click llama a la funcion que da vuelta la imagen y la compara
    imagenM.addEventListener('click', cartaDadaVuelta)
    
    //Reemplaza la imagen del tablero 
    tablero.appendChild(imagenM)
    }
}


//CONTADOR DE CLIC HASTA GANAR!
let pElement = document.getElementById("areaContador");
let contador = 0;
    tablero.onclick = function () {
    contador++;
    pElement.textContent = `Clicks que genero ${contador}`
        if (contador == 30){
            alert("Fin del juego")
        }

    }

let resultadoGeneral = document.getElementById("resultadoGeneral")

//REVISA EL RESULTADO DE LA ELECCION CON CON QUERY SELECTOR (VALIDA QUE LAS IMAGENES SEAN LAS MISMAS)
function controlEleccion() {
    const imagenesM = document.querySelectorAll('img')
    const opcionUnoId = imagenID[0]
    const opcionDosId = imagenID[1]

    if(opcionUnoId == opcionDosId) {
    imagenesM[opcionUnoId].setAttribute('src', 'images/frente.jpg')
    imagenesM[opcionDosId].setAttribute('src', 'images/frente.jpg')
    resultadoGeneral.innerText = `Diste Click sobre la misma imagen`
}
    else if (imagenElegida[0] === imagenElegida[1]) {
    resultadoGeneral.innerText = 'Encontraste dos imagenes iguales!'
    imagenesM[opcionUnoId].setAttribute('src', 'images/blanco.jpg')
    imagenesM[opcionDosId].setAttribute('src', 'images/blanco.jpg')
    imagenesM[opcionUnoId].removeEventListener('click', cartaDadaVuelta)
    imagenesM[opcionDosId].removeEventListener('click', cartaDadaVuelta)

    ImagenGanadora.push(imagenElegida)

} else {
    resultadoGeneral.innerText = 'Vuelve a Intentarlo!'

    imagenesM[opcionUnoId].setAttribute('src', 'images/frente.jpg')
    imagenesM[opcionDosId].setAttribute('src', 'images/frente.jpg')
    }
    imagenElegida = []
    imagenID = []



    resuladoDisplay.textContent = ImagenGanadora.length
    //resuladoDisplay.innerHTML = 
    if  (ImagenGanadora.length === imagenArray.length/2) {
        parar();
        let resultadoFinal = document.getElementById("resultadoFinal")

        resultadoFinal.innerHTML = `${resuladoDisplay.textCntent}`
        if (ImagenGanadora.length == 6){
            // let divNew = document.createElement("div")
            // divNew.setAttribute("id", "registroDeUsuario")
            // divNew.innerText = "CADASAAAAAA"
            // pElement.append(divNew)

            // let formNew =document.createElement("form")
            // formNew.setAttribute("id","formNew")
            // divNew.append(formNew)

            let inputNew = document.createElement("input")
            inputNew.setAttribute("type", "text")
            inputNew.setAttribute("id", "usuarioNew")
            inputNew.setAttribute("name","titulo")
            formNew.append(inputNew)

            // let botonNew = document.createElement("button")
            // botonNew.setAttribute("id","btnGuardar")
            // botonNew.setAttribute("class","btn btn-success")
            // formNew.append(botonNew)
            // botonNew.innerText = "Boton"

            // let divNew2 = document.createElement("div")
            // divNew.append(divNew2)

            // let h3New = document.createElement("h3")
            // h3New.setAttribute("class","text-center m-4 text-bg-success")
            // h3New.innerText = "Registros de Usuarios"
            // divNew2.append(h3New)

            // let divNew3 = document.createElement("div")
            // divNew3.setAttribute("id", "registros")
            // divNew3.setAttribute("class", "productosEstilos")
            // divNew2.append(divNew3)


    //         </div>
    //         <h3 class="text-center m-4 text-bg-success">Registros de Usuarios</h3>
    //         <div id="registros" class="productosEstilos"></div>              
    //   </div>


        }         
    }

}
//CUANDO DA VUELTA LA CARTA
function cartaDadaVuelta() {
    let imagenMid = this.getAttribute('ID')
    imagenElegida.push(imagenArray[imagenMid].nombre)
    imagenID.push(imagenMid)
    this.setAttribute('src', imagenArray[imagenMid].img)
if (imagenElegida.length ===2) {
    setTimeout(controlEleccion, 400)
}
}

//GUARDADO EN STORAGE Y RECUPERACION DE DATOS

class storageUsuarios {
    constructor(id, nombreUser, minutos,segundos, clicksUser, ImagenGanadora){
        this.id = id,
        this.nombreUser = nombreUser,
        this.minutos = m,
        this.segundos = s,
        this.clicksUser = clicksUser,
        this.ImagenGanadora = ImagenGanadora.length
        }
        datosGuardados(){
        }
}
// const storageUsuarios1 = new storageUsuarios(1,"Matias", 0, 25, 17)


 let storageUsers = []

 if(localStorage.getItem("storageUsers")){
        storageUsers = JSON.parse(localStorage.getItem("storageUsers"))
 }
 else{
    localStorage.setItem("storageUsers", JSON.stringify(storageUsers))
 }

let divRegistros = document.getElementById("registros")

let btnGuardar = document.getElementById("btnGuardar")
btnGuardar.addEventListener("click", ()=>{
    if (ImagenGanadora.length == 6){
        guardarRegistros(storageUsers)
    }else{
    alert("guardar")
}
})


function mostrarRegistros(array){
    divRegistros.innerHTML = ""
    array.forEach((storageUsuarios)=>{
        let nuevoRegistro = document.createElement("div")
        nuevoRegistro.innerHTML = `  <div class="container text-center">
        <div class="row">
          <div class="col">
            ${storageUsuarios.nombreUser}
          </div>
          <div class="col">
            ${storageUsuarios.minutos}:${storageUsuarios.segundos}
          </div>
          <div class="col">
            ${storageUsuarios.clicksUser}
          </div>
        </div>
      </div>`
        divRegistros.append(nuevoRegistro)
    })
}
let usuarioNew = document.getElementById("usuarioNew")
function guardarRegistros(array){
    let usuarioCreado = new storageUsuarios (array.length+1, usuarioNew.value, m, s, contador,ImagenGanadora)
    array.push(usuarioCreado)
    localStorage.setItem("storageUsers", JSON.stringify(array))
    usuarioNew.value = ""
    mostrarRegistros(array)
}
mostrarRegistros(storageUsers);
})
