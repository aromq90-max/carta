// ==========================================
// 💗 SEMANA 3
// EL LABERINTO DE NUESTRO AMOR
// PARTE 1/3
// ==========================================


const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;


// ==========================================
// CONFIGURACIÓN
// ==========================================


let nivel = 1;

let vidas = 3;

let tiempo = 90;

let intervaloTiempo;



let frases = [

"💗 Cada paso me acerca más a ti",

"🌸 Aunque el camino sea difícil, siempre te encontraré",

"💕 Eres mi lugar favorito",

"✨ Gracias por caminar conmigo",

"🌹 Mi destino siempre eres tú"

];


let fraseActual = 0;




// ==========================================
// MAPAS
// 0 = camino
// 1 = pared
// ==========================================



const mapas = {

1:[

"111111111111111",
"100000000000001",
"101111111111101",
"101000000001101",
"101011111101101",
"101010000101101",
"101010111101101",
"101010100001101",
"101010101111101",
"101000101000101",
"101111101011101",
"100000001010001",
"101111111010101",
"100000000000001",
"111111111111111"

],



2:[

"1111111111111111111",
"1000000000000000001",
"1011111111111111101",
"1010000000000000101",
"1010111111111110101",
"1010100000000010101",
"1010101111111010101",
"1010101000001010101",
"1010101011101010101",
"1010001010101010001",
"1011111010101111101",
"1000001010100000001",
"1111101010111111101",
"1000001010000000001",
"1011111011111111101",
"1010000000000000101",
"1010111111111110101",
"1000000000000000001",
"1111111111111111111"

],



3:[

"1111111111111111111111111",
"1000000000000000000000001",
"1011111111111111111111101",
"1010000000000000000000101",
"1010111111111111111110101",
"1010100000000000000010101",
"1010101111111111111010101",
"1010101000000000011010101",
"1010101011111111011010101",
"1010001010000001010000101",
"1011111010111101011110101",
"1000000010100001010000001",
"1011111110101111010111111",
"1000000000101000010000001",
"1011111111101011111111101",
"1000000000001000000000101",
"1011111111111111111110101",
"1010000000000000000010101",
"1010111111111111111010101",
"1010000000000000000010001",
"1011111111111111111111101",
"1000000000000000000000001",
"1111111111111111111111111"

]

};





// ==========================================
// ELEMENTOS DEL NIVEL
// ==========================================



let mapa=[];


let jugador={

x:1,
y:1

};



let llave={

x:0,
y:0

};



let puerta={

x:0,
y:0

};



let rosa={

x:0,
y:0

};



let tieneLlave=false;


let tamañoBloque;





// ==========================================
// CARGAR NIVEL
// ==========================================



function cargarNivel(){



let mapaActual = mapas[nivel];



mapa = mapaActual.map(fila => fila.split(""));



tamañoBloque = canvas.width / mapa.length;



tieneLlave=false;



jugador.x=1;

jugador.y=1;



if(nivel===1){


llave={x:5,y:1};

puerta={x:13,y:13};

rosa={x:13,y:1};


}



if(nivel===2){


llave={x:3,y:17};

puerta={x:17,y:1};

rosa={x:17,y:17};


}



if(nivel===3){


llave={x:21,y:21};

puerta={x:1,y:21};

rosa={x:23,y:1};


}




document.getElementById("nivel").innerHTML =
nivel+" / 3";


document.getElementById("hasKey").innerHTML =
"NO";



iniciarTiempo();



dibujar();


}






// ==========================================
// DIBUJAR JUEGO
// ==========================================


function dibujar(){



ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);



for(let y=0;y<mapa.length;y++){


for(let x=0;x<mapa[y].length;x++){



if(mapa[y][x]=="1"){


ctx.fillStyle="#ff69b4";


ctx.shadowColor="#ff1493";

ctx.shadowBlur=8;



ctx.fillRect(

x*tamañoBloque,

y*tamañoBloque,

tamañoBloque,

tamañoBloque

);



ctx.shadowBlur=0;


}

else{


ctx.fillStyle="#ffe4f2";


ctx.fillRect(

x*tamañoBloque,

y*tamañoBloque,

tamañoBloque,

tamañoBloque

);


}



}



}


// llave

dibujarEmoji("🔑",llave.x,llave.y);


// puerta

dibujarEmoji(

tieneLlave?"🚪✨":"🔒",

puerta.x,

puerta.y

);



// rosa

dibujarEmoji(
"🌹",
rosa.x,
rosa.y
);


// jugador

dibujarEmoji(
"💗",
jugador.x,
jugador.y
);



}





function dibujarEmoji(icono,x,y){


ctx.font =
(tamañoBloque*0.8)+"px Arial";


ctx.textAlign="center";

ctx.textBaseline="middle";


ctx.fillText(

icono,

x*tamañoBloque+tamañoBloque/2,

y*tamañoBloque+tamañoBloque/2

);


}

// ==========================================
// 💗 SEMANA 3
// EL LABERINTO DE NUESTRO AMOR
// PARTE 2/3
// ==========================================



// ==========================================
// MOVIMIENTO DEL JUGADOR
// ==========================================


function mover(dx,dy){


let nuevoX = jugador.x + dx;

let nuevoY = jugador.y + dy;



// verificar límites

if(
nuevoX < 0 ||
nuevoY < 0 ||
nuevoY >= mapa.length ||
nuevoX >= mapa[0].length
){

return;

}



// verificar pared

if(mapa[nuevoY][nuevoX] === "1"){

return;

}




jugador.x = nuevoX;

jugador.y = nuevoY;



comprobarObjetos();


dibujar();


}




// ==========================================
// OBJETOS DEL MAPA
// ==========================================


function comprobarObjetos(){



// LLAVE


if(

jugador.x === llave.x &&

jugador.y === llave.y

){


tieneLlave=true;



document.getElementById("hasKey")
.innerHTML="SI 🔑";



mostrarMensaje(
"🔑 Encontraste la llave de mi corazón 💗"
);


}





// PUERTA


if(

jugador.x === puerta.x &&

jugador.y === puerta.y

){



if(tieneLlave){


mostrarMensaje(
"🚪 La puerta se abrió... sigue buscando 🌹"
);



}


else{


mostrarMensaje(
"🔒 Necesitas encontrar la llave primero"
);


}


}






// ROSA FINAL


if(

jugador.x === rosa.x &&

jugador.y === rosa.y

){



if(tieneLlave){



terminarNivel();


}


else{


mostrarMensaje(
"🌹 La rosa te espera... pero falta la llave"
);


}


}




}







// ==========================================
// MENSAJES ROMÁNTICOS
// ==========================================


function mostrarMensaje(texto){



let mensaje =
document.getElementById("mensajeJuego");



if(mensaje){


mensaje.innerHTML = texto;



}


}







function cambiarFrase(){



fraseActual++;



if(fraseActual >= frases.length){

fraseActual=0;

}



mostrarMensaje(
frases[fraseActual]
);



}





setInterval(()=>{


cambiarFrase();


},5000);









// ==========================================
// CONTROL TOUCH CELULAR
// ==========================================



let inicioX=0;

let inicioY=0;




canvas.addEventListener(
"touchstart",
function(e){



inicioX =
e.touches[0].clientX;


inicioY =
e.touches[0].clientY;



});






canvas.addEventListener(
"touchend",
function(e){



let finalX =
e.changedTouches[0].clientX;


let finalY =
e.changedTouches[0].clientY;




let diferenciaX =
finalX - inicioX;



let diferenciaY =
finalY - inicioY;






// movimiento horizontal


if(
Math.abs(diferenciaX) >
Math.abs(diferenciaY)

){



if(diferenciaX > 30){


mover(1,0);


}


else if(diferenciaX < -30){


mover(-1,0);


}



}






// movimiento vertical


else{



if(diferenciaY > 30){


mover(0,1);


}


else if(diferenciaY < -30){


mover(0,-1);


}


}





});








// ==========================================
// TECLADO PC
// ==========================================


document.addEventListener(
"keydown",
function(e){



if(e.key==="ArrowUp"){


mover(0,-1);


}



if(e.key==="ArrowDown"){


mover(0,1);


}



if(e.key==="ArrowLeft"){


mover(-1,0);


}



if(e.key==="ArrowRight"){


mover(1,0);


}




});







// ==========================================
// TIEMPO
// ==========================================


function iniciarTiempo(){



clearInterval(intervaloTiempo);



if(nivel===1){

tiempo=90;

}



if(nivel===2){

tiempo=120;

}



if(nivel===3){

tiempo=180;

}





document.getElementById("time")
.innerHTML=tiempo;




intervaloTiempo=setInterval(()=>{


tiempo--;



document.getElementById("time")
.innerHTML=tiempo;





if(tiempo<=0){



vidas--;



document.getElementById("life")
.innerHTML=vidas;



mostrarMensaje(
"💔 El tiempo terminó, inténtalo nuevamente"
);



jugador.x=1;

jugador.y=1;



iniciarTiempo();



dibujar();




if(vidas<=0){


alert(
"El camino fue difícil, pero el amor siempre encuentra una forma 💗"
);



location.reload();


}



}



},1000);



}






// ==========================================
// FINAL DE NIVEL
// ==========================================


function terminarNivel(){



clearInterval(intervaloTiempo);




if(nivel < 3){



document.getElementById("levelScreen")
.style.display="flex";



document.getElementById("levelTitle")
.innerHTML=
"✨ Nivel "+nivel+" completado ✨";



document.getElementById("levelMessage")
.innerHTML=
"Cada camino superado nos acerca más 💗";





setTimeout(()=>{


document.getElementById("levelScreen")
.style.display="none";



nivel++;



cargarNivel();



},3000);





}



else{



mostrarFinal();



}




}

// ==========================================
// 💗 SEMANA 3
// EL LABERINTO DE NUESTRO AMOR
// PARTE 3/3
// ==========================================


// ==========================================
// PANTALLA FINAL
// ==========================================


function mostrarFinal(){


document.getElementById("win")
.style.display="flex";


document.getElementById("mensajeJuego")
.innerHTML=

"🌹 Encontraste el camino hasta mi corazón 💗";



}






// ==========================================
// CORAZONES FLOTANDO
// ==========================================


function crearCorazones(){



let contenedor =
document.getElementById("hearts");



if(!contenedor){

return;

}




for(let i=0;i<35;i++){



let corazon =
document.createElement("div");



corazon.className="heart";


corazon.innerHTML="💗";



corazon.style.left =
Math.random()*100+"%";



corazon.style.animationDuration =

(5 + Math.random()*8)+"s";



corazon.style.animationDelay =

Math.random()*5+"s";



contenedor.appendChild(corazon);



}



}





// ==========================================
// EFECTO AL TOMAR LLAVE
// ==========================================


function efectoLlave(){


canvas.style.transform="scale(1.03)";


setTimeout(()=>{


canvas.style.transform="scale(1)";


},300);



}








// ==========================================
// BLOQUEAR ZOOM CELULAR
// ==========================================


document.addEventListener(
"gesturestart",
function(e){

e.preventDefault();

});







// ==========================================
// INICIO DEL JUEGO
// ==========================================


crearCorazones();


cargarNivel();




// ==========================================
// EVITAR SCROLL AL JUGAR
// ==========================================


document.body.addEventListener(
"touchmove",
function(e){


if(e.target===canvas){

e.preventDefault();

}


},
{
passive:false
});
