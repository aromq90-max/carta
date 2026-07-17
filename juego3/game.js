const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");


canvas.width = 600;
canvas.height = 600;


// ===============================
// VARIABLES
// ===============================


let nivel = 1;

let filas;
let columnas;

let tamaño;


let mapa=[];


let jugador;

let llave;

let puerta;

let rosa;


let tiempo;

let vidas=3;




let frases=[

"💗 Cada paso me acerca más a ti",

"🌸 Aunque el camino sea difícil, siempre te encontraré",

"💕 Eres mi lugar favorito",

"✨ Gracias por formar parte de mi historia",

"🌹 Mi destino siempre termina contigo"

];







// ===============================
// INICIAR NIVEL
// ===============================


function iniciarNivel(){


if(nivel==1){

filas=15;
columnas=15;
tiempo=60;

}



if(nivel==2){

filas=21;
columnas=21;
tiempo=50;

}



if(nivel==3){

filas=29;
columnas=29;
tiempo=40;

}



tamaño=600/columnas;



crearMapa();



jugador={

x:1,
y:1

};




llave=buscarLugar();

puerta=buscarLugar();

rosa=buscarLugar();



puerta.abierta=false;


document.getElementById("nivel")
.innerHTML=nivel+"/3";


document.getElementById("time")
.innerHTML=tiempo;



dibujar();


}








// ===============================
// CREAR LABERINTO
// ===============================


function crearMapa(){


mapa=[];


for(let y=0;y<filas;y++){


mapa[y]=[];


for(let x=0;x<columnas;x++){


mapa[y][x]=1;


}


}



crearCamino(1,1);


}





function crearCamino(x,y){


mapa[y][x]=0;



let direcciones=[

[2,0],
[-2,0],
[0,2],
[0,-2]

];



direcciones.sort(()=>Math.random()-0.5);



for(let d of direcciones){


let nx=x+d[0];

let ny=y+d[1];



if(

nx>0 &&
ny>0 &&
nx<columnas-1 &&
ny<filas-1 &&
mapa[ny][nx]==1

){


mapa[y+d[1]/2][x+d[0]/2]=0;


crearCamino(nx,ny);


}



}



}









function buscarLugar(){


let p;



do{


p={


x:Math.floor(Math.random()*columnas),

y:Math.floor(Math.random()*filas)


};


}

while(

mapa[p.y][p.x]!=0 ||

(p.x==1&&p.y==1)

);



return p;


}










// ===============================
// DIBUJAR
// ===============================


function dibujar(){


ctx.clearRect(0,0,600,600);




for(let y=0;y<filas;y++){


for(let x=0;x<columnas;x++){



if(mapa[y][x]==1){



ctx.fillStyle="#ff4fa3";



ctx.shadowColor="#ff1493";

ctx.shadowBlur=8;



ctx.fillRect(

x*tamaño,

y*tamaño,

tamaño,

tamaño

);



ctx.shadowBlur=0;


}


else{


ctx.fillStyle="#ffd6eb";


ctx.fillRect(

x*tamaño,

y*tamaño,

tamaño,

tamaño

);



}




}


}






emoji("🔑",llave);



emoji(

puerta.abierta?

"🚪✨":

"🔒",

puerta

);



emoji("🌹",rosa);



emoji("💗",jugador);



}





function emoji(icon,obj){


ctx.font=(tamaño*.8)+"px Arial";


ctx.textAlign="center";

ctx.textBaseline="middle";


ctx.fillText(

icon,

obj.x*tamaño+tamaño/2,

obj.y*tamaño+tamaño/2

);


}








// ===============================
// MOVIMIENTO
// ===============================


function mover(direccion){


let x=jugador.x;

let y=jugador.y;



if(direccion=="up")y--;

if(direccion=="down")y++;

if(direccion=="left")x--;

if(direccion=="right")x++;





if(

x>=0&&
y>=0&&
x<columnas&&
y<filas&&
mapa[y][x]==0

){


jugador.x=x;

jugador.y=y;


revisar();



cambiarMensaje();


}



dibujar();



}









function revisar(){



// LLAVE


if(

jugador.x==llave.x&&
jugador.y==llave.y

){


llave.x=-10;


llave.y=-10;



puerta.abierta=true;



document.getElementById("hasKey")
.innerHTML="SI 🔑";


}






// PUERTA


if(

puerta.abierta&&

jugador.x==puerta.x&&

jugador.y==puerta.y

){



puerta.x=-10;

puerta.y=-10;


}




// ROSA


if(

jugador.x==rosa.x&&

jugador.y==rosa.y&&

puerta.abierta

){


ganarNivel();


}



}









function cambiarMensaje(){


let r=

frases[

Math.floor(

Math.random()*frases.length

)

];



document.getElementById("loveText")
.innerHTML=r;


}









// ===============================
// TOUCH CELULAR
// ===============================


let inicioX;

let inicioY;



canvas.addEventListener(
"touchstart",
e=>{


inicioX=e.touches[0].clientX;

inicioY=e.touches[0].clientY;


});





canvas.addEventListener(
"touchend",
e=>{


let dx=e.changedTouches[0].clientX-inicioX;

let dy=e.changedTouches[0].clientY-inicioY;



if(Math.abs(dx)>Math.abs(dy)){


if(dx>30)

mover("right");

else

mover("left");


}

else{


if(dy>30)

mover("down");


else

mover("up");


}



});










// ===============================
// NIVEL
// ===============================


function ganarNivel(){



if(nivel<3){



alert(

"✨ Nivel "+nivel+" completado 💗"

);



nivel++;



iniciarNivel();


}

else{


document.getElementById("win")
.style.display="block";


}



}








// ===============================
// TIEMPO
// ===============================


setInterval(()=>{


tiempo--;


document.getElementById("time")
.innerHTML=tiempo;



if(tiempo<=0){


vidas--;


document.getElementById("life")
.innerHTML=vidas;



jugador.x=1;

jugador.y=1;



tiempo=60;



if(vidas<=0){


alert("Perdiste 💔");


location.reload();


}


}



},1000);









// CORAZONES


for(let i=0;i<30;i++){


let h=document.createElement("div");


h.className="heart";


h.innerHTML="💗";


h.style.left=

Math.random()*100+"%";


h.style.animationDuration=

(5+Math.random()*8)+"s";


document.body.appendChild(h);


}







iniciarNivel();
