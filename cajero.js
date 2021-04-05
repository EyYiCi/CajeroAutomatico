//#region BD
//const BDatos = require('./cuentahabientes.json');
function cargarJson(){
    var ajaxRequest = new XMLHttpRequest();
    ajaxRequest.onreadystatechange = function(){

      if(ajaxRequest.readyState == 4){
        //the request is completed, now check its status
        if(ajaxRequest.status == 200){
          //turn JSON into array
          const BDatos = JSON.parse(ajaxRequest.responseText);
         
          validarDatos(BDatos);

        }
        else{
          console.log("Status error: " + ajaxRequest.status);
        }
      }
      else{
        console.log("Ignored readyState: " + ajaxRequest.readyState);
      }
    }
    ajaxRequest.open('GET', './cuentahabientes.json');
    ajaxRequest.send();
  }

//#endregion BD

//#region Variables
let userValido = false;

const botonValidarLogin = document.getElementById("ValidarLogin");

const inpCuenta = document.getElementById("inpCuenta");
const inpPIN = document.getElementById("inpPIN");
const mnsValidacionUser = document.getElementById("mensajeValidacion");
const formElement = document.getElementById("formContenedor");
//const contenedorCuenta = document.getElementById("menuCajero");

//#endregion Variables

inicializarComponentes();
//Eventos
botonValidarLogin.addEventListener("click",inicioDePrograma);

  
//#region Funciones

function inicializarComponentes(){
    mnsValidacionUser.style.visibility = 'hidden';
    formElement.style.display = 'block'; 
    inpCuenta.value="";
    inpPIN.value="";
}

function inicioDePrograma(){
    cargarJson();
}

function validarDatos(BDatos){   
    for (let index = 0; index < BDatos.length; index++) {
        const bdCuenta = BDatos[index];
        if(inpCuenta.value === bdCuenta.cuenta &&  inpPIN.value === bdCuenta.pin ){
            userValido = true;
            formElement.style.display = 'none'; 
            window.open("./dashboard.html","_self");

            break;
        }
        else{
            userValido = false;
            mnsValidacionUser.style.visibility = 'visible';
            mnsValidacionUser.innerHTML = "La cuenta o pin es incorrecta.";
        }
    }
}


//#endregion Funciones