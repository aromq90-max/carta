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