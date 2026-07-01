/*==========================
      ESTRELLAS
==========================*/

const stars=document.getElementById("stars");

for(let i=0;i<120;i++){

const star=document.createElement("div");

star.className="star";

star.style.left=Math.random()*100+"vw";

star.style.top=Math.random()*100+"vh";

star.style.animationDelay=Math.random()*5+"s";

star.style.animationDuration=(2+Math.random()*3)+"s";

stars.appendChild(star);

}

/*==========================
      PÉTALOS
==========================*/

const petals=document.getElementById("petals");

setInterval(()=>{

const petal=document.createElement("div");

petal.className="petal";

petal.innerHTML="🌸";

petal.style.left=Math.random()*100+"vw";

petal.style.animationDuration=(8+Math.random()*6)+"s";

petal.style.fontSize=(18+Math.random()*18)+"px";

petals.appendChild(petal);

setTimeout(()=>{

petal.remove();

},15000);

},350);

/*==========================
      BRILLOS
==========================*/

const sparkles=document.getElementById("sparkles");

setInterval(()=>{

const spark=document.createElement("div");

spark.className="spark";

spark.style.left=Math.random()*100+"vw";

spark.style.animationDuration=(4+Math.random()*5)+"s";

spark.style.opacity=Math.random();

sparkles.appendChild(spark);

setTimeout(()=>{

spark.remove();

},9000);

},250);

/*==========================
      PARALLAX
==========================*/

document.addEventListener("mousemove",(e)=>{

let x=(window.innerWidth/2-e.clientX)/18;

let y=(window.innerHeight/2-e.clientY)/18;

document.getElementById("background").style.transform=
`translate(${x}px,${y}px) scale(1.08)`;

});