const btn=document.getElementById("start");

const welcome=document.getElementById("welcome");

const main=document.getElementById("main");

const music=document.getElementById("music");

btn.onclick=()=>{

music.play();

welcome.style.opacity="0";

setTimeout(()=>{

welcome.style.display="none";

main.style.opacity="1";

},1500);

createHearts();

}

function createHearts(){

setInterval(()=>{

const heart=document.createElement("div");

heart.className="heart";

heart.innerHTML="❤️";

heart.style.left=Math.random()*100+"vw";

heart.style.animationDuration=(4+Math.random()*6)+"s";

heart.style.fontSize=(20+Math.random()*30)+"px";

document.body.appendChild(heart);

setTimeout(()=>{

heart.remove();

},10000);

},300);

}
const birthday = new Date("2026-07-25T00:00:00");

function updateCountdown(){

const now = new Date();

const diff = birthday - now;

if(diff <= 0){

document.getElementById("countdown").style.display="none";

document.querySelector(".progress-container").style.display="none";

document.getElementById("progress-text").style.display="none";

const msg=document.getElementById("birthday-message");

msg.style.display="block";

msg.innerHTML=`
🎂<br>

¡¡Feliz cumpleaños mi amor!! ❤️

<br><br>

Hoy celebra el mundo
el día en que nació
la mujer más maravillosa
que he conocido.

`;

return;

}

const days=Math.floor(diff/(1000*60*60*24));

const hours=Math.floor((diff/(1000*60*60))%24);

const minutes=Math.floor((diff/(1000*60))%60);

const seconds=Math.floor((diff/1000)%60);

document.getElementById("days").textContent=days;
document.getElementById("hours").textContent=hours;
document.getElementById("minutes").textContent=minutes;
document.getElementById("seconds").textContent=seconds;

}

/* Barra de progreso */

function updateProgress(){

const start=new Date("2026-07-01");

const end=new Date("2026-08-01");

const now=new Date();

const total=end-start;

const current=now-start;

let percent=(current/total)*100;

if(percent<0) percent=0;
if(percent>100) percent=100;

document.getElementById("progress-bar").style.width=percent+"%";

document.getElementById("progress-text").innerHTML=

"Julio ya va <b>"+percent.toFixed(1)+"%</b> recorrido ❤️";

}

updateCountdown();
updateProgress();

setInterval(updateCountdown,1000);
setInterval(updateProgress,60000);
