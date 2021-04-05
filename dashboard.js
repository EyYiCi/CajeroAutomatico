var BDatos;
let datoActual = {};

window.onload = function() {
    cargarJson();
  };


const botonSalir = document.getElementById("btnSalir");
const lblNombre = document.getElementById("nombreCliente");


botonSalir.addEventListener("click",salirSistema);


function cargarJson(){
    var ajaxRequest = new XMLHttpRequest();
    ajaxRequest.onreadystatechange = function(){

      if(ajaxRequest.readyState == 4){
        //the request is completed, now check its status
        if(ajaxRequest.status == 200){
          //turn JSON into array
          BDatos = JSON.parse(ajaxRequest.responseText);  
          
          
          for (let index = 0; index < BDatos.length; index++) {
              const datosCuenta = BDatos[index];

              if(datosCuenta.cuenta=="00012345"){
                console.log("Dash" + datosCuenta) 
                cargarDatos(datosCuenta); 
              }     
          }          
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

function cargarDatos(datosCuenta){
    lblNombre.innerHTML = "HOLA, " + datosCuenta.nombre

    for (let index = 0; index < datosCuenta.tarjetas.length; index++) {
        const bdTarjeta = datosCuenta.tarjetas[index];

        addElement (index,bdTarjeta); 

    }
}

function addElement (index, datosCuenta) {

    console.log("datoscuenta: " + datosCuenta)
    // crea un nuevo div
    var div = document.createElement('div');
    div.setAttribute('class', 'form-inline');
        div.innerHTML = '<div style="clear:both" class="tarjeta_'+index+' col-md-offset-1 col-md-6"><label id="lbl_'+index+'"><a onclick="verSaldo('+index+');" href="">&nbsp;&nbsp;&nbsp;'+datosCuenta.bancoTarjeta+'&nbsp;&nbsp;&nbsp;'+datosCuenta.tipo+'|</a></label><br><label>***'+datosCuenta.numTarjeta+'</label></div>';
        document.getElementById('divDinamico').appendChild(div);document.getElementById('divDinamico').appendChild(div);
 
          
  }

  function verSaldo(index){
 
    const lblNombre = document.getElementById("lbl_"+index);
    const saldo = document.getElementById("saldoActual");
    console.log("hola " + lblNombre);
    saldo.innerHTML= lblNombre + "si"


  }


function salirSistema(){
    window.open("./login.html","_self");
}