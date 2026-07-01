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