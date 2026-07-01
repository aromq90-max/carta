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
/*==========================
   SEMANAS / JUEGOS
==========================*/

function openWeek(week){

const reward=document.getElementById("reward"+week);

reward.innerHTML="🎁 Recompensa desbloqueada... ❤️";

setTimeout(()=>{

reward.innerHTML="💖 Te amo más cada día 💖";

},2000);

}

/*==========================
   DESBLOQUEO PROGRESIVO
   (simulación de avance)
==========================*/

function unlockWeeks(){

const now=new Date();

const start=new Date("2026-07-01");

const diffDays=Math.floor((now-start)/(1000*60*60*24));

if(diffDays>=0) document.getElementById("week1").classList.add("unlocked");

if(diffDays>=7){

document.getElementById("week2").classList.remove("locked");

document.getElementById("week2").classList.add("unlocked");

}

if(diffDays>=14){

document.getElementById("week3").classList.remove("locked");

document.getElementById("week3").classList.add("unlocked");

}

if(diffDays>=21){

document.getElementById("week4").classList.remove("locked");

document.getElementById("week4").classList.add("unlocked");

}

}

unlockWeeks();

// Zoom de fotos
document.querySelectorAll(".photo").forEach(photo=>{

photo.addEventListener("click",()=>{

photo.classList.toggle("zoom");

});

});

/* =========================
   CONFETI AUTOMÁTICO
========================= */

function createConfetti(){

const confetti=document.createElement("div");

confetti.classList.add("confetti");

confetti.style.left=Math.random()*100+"vw";

confetti.style.animationDuration=(3+Math.random()*3)+"s";

confetti.style.background=["#ff4d88","#ffb6c1","#fff","#ff69b4"][Math.floor(Math.random()*4)];

document.body.appendChild(confetti);

setTimeout(()=>confetti.remove(),6000);

}

setInterval(createConfetti,400);

/* =========================
   BOTÓN SECRETO
========================= */

document.getElementById("secret-btn").onclick=()=>{

alert("❤️ Te amo infinitamente ❤️");

for(let i=0;i<50;i++){
setTimeout(()=>{
createConfetti();
},i*100);
}

}
document.getElementById("openBtn").addEventListener("touchstart", openLetter);

function openLetter(){

document.getElementById("envelope").style.transform="scale(0)";



setTimeout(()=>{

document.getElementById("envelope").style.display="none";

document.getElementById("letter").style.display="block";

typeWriter();

},500);

}
