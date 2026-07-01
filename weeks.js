const today=new Date().getDate();

function unlock(id){

const card=document.getElementById(id);

const status=card.querySelector(".status");

const button=card.querySelector("button");

status.innerHTML="Disponible";

status.className="status available";

button.disabled=false;

button.innerHTML="Descubrir";

}

if(today>=1){

unlock("week1");

}

if(today>=8){

unlock("week2");

}

if(today>=15){

unlock("week3");

}

if(today>=22){

unlock("week4");

}