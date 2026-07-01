const confettiContainer = document.getElementById("confetti-container");

function createConfetti(){

const confetti = document.createElement("div");

confetti.classList.add("confetti");

confetti.style.left = Math.random()*100 + "vw";

confetti.style.backgroundColor = `hsl(${Math.random()*360},100%,60%)`;

confetti.style.animationDuration = (3 + Math.random()*3) + "s";

confetti.style.width = confetti.style.height = (6 + Math.random()*8) + "px";

confettiContainer.appendChild(confetti);

setTimeout(()=>confetti.remove(),6000);

}

function startConfetti(){
    setInterval(createConfetti,80);
}